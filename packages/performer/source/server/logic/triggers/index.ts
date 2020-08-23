// #region libraries
    // #region libraries
    import path from 'path';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        InputGenerateTrigger,
        InputValueString,
        Trigger,
        Commit,
        BuildData,
        CodeProvider,
    } from '#server/data/interfaces';

    import {
        repositoriesPath,
    } from '#server/data/constants';

    import {
        loadTriggers,
    } from '#server/logic/loader';

    import {
        pushToBuildQueue,
    } from '#server/logic/build';

    import database from '#server/services/database';

    import {
        removeDuplicates,
    } from '#server/utilities/general';
    // #endregion external
// #endregion libraries



// #region module
export const registerTrigger = async (
    input: InputGenerateTrigger,
) => {
    const {
        id,
        name,
        repository,
        branch,
        path,
        file,
        project,
    } = input;

    const generatedID = id || uuid.generate();

    const trigger: Trigger = {
        id: generatedID,
        name,
        repository,
        branch,
        path,
        file,
        project,
    };

    await database.store(
        'trigger',
        generatedID,
        trigger,
    );

    return trigger;
}


export const deregisterTrigger = async (
    input: InputValueString,
) => {
    await database.obliterate(
        'trigger',
        input.value,
    );
}


export const getActiveTriggers = async (
    branchName: string,
    commit: Commit,
) => {
    const triggers = await loadTriggers();

    const activeTriggers: Trigger[] = [];

    for (const watchedTrigger of triggers) {
        // TODO: check for project match

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
    type: CodeProvider,
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
            type,
        );
    }
}


export const handleTrigger = async (
    commit: Commit,
    trigger: Trigger,
    repositoryName: string,
    branchName: string,
    type: CodeProvider,
) => {
    try {
        const buildID = uuid.generate();

        const repositoryPath = path.join(
            repositoriesPath,
            `/${type}/${repositoryName}`,
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

        await pushToBuildQueue(buildData);
    } catch (error) {
        return;
    }
}
// #endregion module
