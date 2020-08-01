import {
    promises as fs,
} from 'fs';

import path from 'path';

import {
    execSync,
} from 'child_process';

import yaml from 'js-yaml';

import {
    Build,
    Performer,
    PerformerStage,
    BuildData,
} from '#server/data/interfaces';

import {
    buildlogsPath,
    buildqueuePath,
    buildsPath,
} from '#server/data/constants';

import {
    copyDirectory,
} from '#server/utilities/copy';



export const pushToBuildQueue = async (
    buildData: BuildData,
) => {
    const buildlogName = buildData.id + '.json';

    const buildlogPath = path.join(
        buildqueuePath,
        buildlogName,
    );

    await fs.writeFile(
        buildlogPath,
        JSON.stringify(buildData, null, 4),
    );

    await writeBuildFile(
        buildData.id,
        'QUEUE',
        buildData.trigger.id,
        0,
        buildData.date,
    );
}


export const writeBuildFile = async (
    id: string,
    status: any,
    trigger: string,
    time: number,
    date: number,
) => {
    const build: Build = {
        id,
        status,
        trigger,
        time,
        date,
    };

    const buildFile = id + '.json';

    const buildPath = path.join(
        buildsPath,
        buildFile,
    );

    await fs.writeFile(
        buildPath,
        JSON.stringify(build, null, 4),
    );
}


export const triggerBuild = async (
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
