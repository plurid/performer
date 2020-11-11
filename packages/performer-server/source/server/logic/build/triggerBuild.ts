// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import path from 'path';

    import yaml from 'js-yaml';

    import Deon, {
        typer,
        DEON_FILENAME_EXTENSION,
    } from '@plurid/deon';
    // #endregion libraries


    // #region external
    import {
        Performer,
        Trigger,
        BuildData,
    } from '#server/data/interfaces';

    import {
        logLevels,
    } from '#server/data/constants';

    import {
        copyDirectory,
    } from '#server/utilities';

    import {
        updateWorkRepository,
    } from '#server/logic/repository';

    import {
        handlePerformerInWorker,
    } from '#server/logic/worker';

    import logger from '#server/services/logger';
    // #endregion external
// #endregion imports



// #region module
export const parseDeonTrigger = async (
    performerFilePath: string,
) => {
    const deon = new Deon();
    const data = await deon.parseFile(performerFilePath);
    const typedData = typer(data);

    return typedData;
}


export const readPerformerTrigger = async (
    repositoryWorkPath: string,
    trigger: Trigger,
) => {
    const extension = path.extname(trigger.file);

    const performerFilePath = path.join(
        repositoryWorkPath,
        '/' + trigger.file,
    );

    if (extension === DEON_FILENAME_EXTENSION) {
        const performerObject = await parseDeonTrigger(
            performerFilePath,
        );

        const performer: Performer = {
            ...performerObject,
            timeout: performerObject.timeout ?? 600,
        };

        return {
            performer,
            performerFilePath,
        };
    }

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

    return {
        performer,
        performerFilePath,
    };
}


export const triggerBuild = async (
    buildData: BuildData,
) => {
    try {
        const {
            branchName,
            repositoryRootPath,
            repositoryWorkPath,
            trigger,
        } = buildData;


        await fs.mkdir(repositoryWorkPath, {
            recursive: true,
        });

        await copyDirectory(
            repositoryRootPath,
            repositoryWorkPath,
        );

        await updateWorkRepository(
            branchName,
            repositoryWorkPath,
        );

        const performerTriggerData = await readPerformerTrigger(
            repositoryWorkPath,
            trigger,
        );

        if (!performerTriggerData) {
            return;
        }

        const data = {
            buildData,
            performerTriggerData,
            workDirectoryPath: repositoryWorkPath,
            project: trigger.project,
        };

        handlePerformerInWorker(data);
    } catch (error) {
        logger.log(
            '[Performer Error] :: triggerBuild',
            logLevels.error,
            error,
        );

        return;
    }
}
// #endregion module
