// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import path from 'path';

    import yaml from 'js-yaml';
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
        handlePerformer,
    } from '#server/logic/commands';

    import {
        updateWorkRepository,
    } from '#server/logic/repository';
    // #endregion external
// #endregion imports



// #region module
export const readPerformerTrigger = async (
    repositoryWorkPath: string,
    trigger: Trigger,
) => {
    const performerFilePath = path.join(
        repositoryWorkPath,
        '/' + trigger.file,
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

        handlePerformer(
            buildData,
            performerTriggerData,
            repositoryWorkPath,
            trigger.project,
        );
    } catch (error) {
        if (logLevel <= logLevels.error) {
            console.log('[Performer Error] :: triggerBuild', error);
        }

        return;
    }
}
// #endregion module
