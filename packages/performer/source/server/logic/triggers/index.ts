import {
    promises as fs,
} from 'fs';

import path from 'path';

import {
    execSync,
} from 'child_process';

import yaml from 'js-yaml';

import {
    uuid,
} from '@plurid/plurid-functions';

import {
    Trigger,
    Build,
    Performer,
    PerformerStage,
    Commit,
    BuildData,
} from '#server/data/interfaces';

import {
    repositoriesPath,
    buildlogsPath,
} from '#server/data/constants';

import {
    copyDirectory,
    removeDuplicates,
} from '#server/utilities';

import {
    loadTriggers,
} from '#server/logic/loader';



export const getActiveTriggers = async (
    branchName: string,
    commit: Commit,
) => {
    const triggers = await loadTriggers();

    let activeTriggers: Trigger[] = [];

    for (const watchedTrigger of triggers) {
        if (watchedTrigger.branch === branchName) {
            for (const addedFile of commit.added) {
                if (addedFile.includes(watchedTrigger.path)) {
                    activeTriggers.push(
                        watchedTrigger,
                    );
                    break;
                }
            }

            for (const removedFile of commit.removed) {
                if (removedFile.includes(watchedTrigger.path)) {
                    activeTriggers.push(
                        watchedTrigger,
                    );
                    break;
                }
            }

            for (const modifiedFile of commit.modified) {
                if (modifiedFile.includes(watchedTrigger.path)) {
                    activeTriggers.push(
                        watchedTrigger,
                    );
                    break;
                }
            }
        }
    }

    return removeDuplicates(
        activeTriggers,
        'id',
    );
}


export const handleTriggers = async (
    commit: Commit,
    branchName: string,
    repositoryName: string,
) => {
    const activeTriggers = await getActiveTriggers(
        branchName,
        commit,
    );
    if (activeTriggers.length == 0) {
        return;
    }

    for (const trigger of activeTriggers) {
        handleTrigger(
            commit,
            trigger,
            repositoryName,
            branchName,
        );
    }
}


export const handleTrigger = async (
    commit: Commit,
    trigger: Trigger,
    repositoryName: string,
    branchName: string,
) => {
    try {
        // TODO
        // create build object and push it up the queue

        const buildID = uuid.generate();

        const repositoryPath = path.join(
            repositoriesPath,
            './github',
            '/' + repositoryName,
        );
        const repositoryRootPath = path.join(
            repositoryPath,
            '/root',
        );

        const repositoryWork = '/' + buildID;
        const repositoryWorkPath = path.join(
            repositoryPath,
            repositoryWork,
        );

        const buildDate = Math.floor(Date.now() / 1000);
        const buildData: BuildData = {
            id: buildID,
            commit: commit.id,
            trigger: {
                ...trigger,
            },
            date: buildDate,
            branchName,
            repositoryPath,
            repositoryRootPath,
            repositoryWorkPath,
        };

        triggerWork(buildData);
    } catch (error) {
        return;
    }
}


export const triggerWork = async (
    buildData: BuildData,
) => {
    const {
        branchName,
        repositoryRootPath,
        repositoryWorkPath,
    } = buildData;


    await fs.mkdir(repositoryWorkPath, {
        recursive: true,
    });

    await copyDirectory(
        repositoryRootPath,
        repositoryWorkPath,
    );

    const gitCommandFetchOrigin = 'git fetch origin';
    const gitCommandResetHardBranch = `git reset --hard origin/${branchName}`;

    execSync(gitCommandFetchOrigin, {
        cwd: repositoryWorkPath,
    });
    execSync(gitCommandResetHardBranch, {
        cwd: repositoryWorkPath,
    });


    const performerFilePath = path.join(
        repositoryWorkPath,
        '/' + buildData.trigger.file,
    );
    const performerFile = await fs.readFile(performerFilePath, 'utf-8');
    const performerObject = yaml.safeLoad(performerFile);

    if (!performerObject || typeof performerObject === 'string') {
        return;
    }

    const performerData: any = performerObject;

    const performer: Performer = {
        ...performerData,
        timeout: performerData.timeout ?? 600,
    };

    handlePerformer(
        buildData,
        performer,
        repositoryWorkPath,
        performerFilePath,
    );
}


export const handlePerformer = async (
    buildData: BuildData,
    performer: Performer,
    workDirectoryPath: string,
    performerFilePath: string,
) => {
    const {
        id,
        trigger,
        date,
    } = buildData;

    const queueBuild: Build = {
        id,
        date,
        status: 'QUEUED',
        time: 0,
        trigger: trigger.id,
    };

    const {
        stages,
        timeout,
        nodejs,
        secrets,
    } = performer;

    const performContext = {
        timeout,
        nodejs,
        secrets,
        workDirectoryPath,
        performerFilePath,
    };

    for (const [index, stage] of stages.entries()) {
        handleStage(
            queueBuild,
            stage,
            index,
            performContext,
        );
    }
}


export const handleStage = async (
    build: Build,
    stage: PerformerStage,
    index: number,
    performContext: any,
) => {
    const {
        name,
        command,
        imagene,
        directory,
        environment,
    } = stage;

    const {
        workDirectoryPath,
        performerFilePath,
    } = performContext;

    const imageneCommand = imagene === 'demand' ? '' : imagene;

    const actionCommand = `${imageneCommand} ${command}`;

    const commandDirectory = directory
        ? path.join(
            workDirectoryPath,
            directory,
        ) : path.dirname(performerFilePath);

    const output = execSync(actionCommand, {
        cwd: commandDirectory,
        env: {
            ...environment,
        },
    });

    saveBuildlog(
        build.id,
        index,
        output.toString('utf-8'),
    );
}


export const saveBuildlog = (
    buildID: string,
    stageIndex: number,
    data: string,
) => {
    const buildlogName = buildID + '_' + stageIndex;

    const buildlogPath = path.join(
        buildlogsPath,
        buildlogName,
    );

    fs.writeFile(buildlogPath, data);
}
