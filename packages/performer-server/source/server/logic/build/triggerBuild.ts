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
        logLevel,
        logLevels,
    } from '#server/data/constants';

    import {
        copyDirectory,
    } from '#server/utilities';

    import {
        updateWorkRepository,
    } from '#server/logic/repository';

    // import {
    //     handlePerformer,
    // } from '#server/logic/commands';

    import {
        handlePerformerInWorker,
    } from '#server/logic/worker';
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

        // handlePerformer(
        //     buildData,
        //     performerTriggerData,
        //     repositoryWorkPath,
        //     trigger.project,
        // );

        const data = {
            buildData,
            performerTriggerData,
            workDirectoryPath: repositoryWorkPath,
            project: trigger.project,
        };

        handlePerformerInWorker(data);
    } catch (error) {
        if (logLevel <= logLevels.error) {
            console.log('[Performer Error] :: triggerBuild', error);
        }

        return;
    }
}
// #endregion module
