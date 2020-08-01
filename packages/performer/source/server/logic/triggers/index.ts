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
        const buildDate = Math.floor(Date.now() / 1000);
        const buildData = {
            commit: commit.id,
            trigger: {
                ...trigger,
            },
            date: buildDate,
        };


        const repositoryPath = path.join(
            repositoriesPath,
            './github',
            '/' + repositoryName,
        );
        const repositoryRootPath = path.join(
            repositoryPath,
            '/root',
        );

        const workDirectory = '/' + commit.id + '_' + buildData.trigger.id;
        const workDirectoryPath = path.join(
            repositoryPath,
            workDirectory,
        );
        await fs.mkdir(workDirectoryPath, {
            recursive: true,
        });

        await copyDirectory(
            repositoryRootPath,
            workDirectoryPath,
        );

        const gitCommandFetchOrigin = 'git fetch origin';
        const gitCommandResetHardBranch = `git reset --hard origin/${branchName}`;

        execSync(gitCommandFetchOrigin, {
            cwd: workDirectoryPath,
        });
        execSync(gitCommandResetHardBranch, {
            cwd: workDirectoryPath,
        });


        const performerFilePath = path.join(
            workDirectoryPath,
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
            workDirectoryPath,
            performerFilePath,
        );
    } catch (error) {
        return;
    }
}


export const handlePerformer = async (
    buildData: any,
    performer: Performer,
    workDirectoryPath: string,
    performerFilePath: string,
) => {
    const {
        trigger,
        date,
    } = buildData;

    const buildID = uuid.generate();

    const queueBuild: Build = {
        id: buildID,
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
