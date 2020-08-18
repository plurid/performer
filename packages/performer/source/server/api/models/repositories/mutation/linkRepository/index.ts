// #region imports
    // #region external
    import {
        Context,
        InputLinkRepository,
    } from '#server/data/interfaces';

    import {
        getRepository,
        getRepositoryDataByNameWithOwner,
    } from '#server/api/requesters';

    import {
        registerRepositoryMetadata,
    } from '#server/logic/repository';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const linkRepositoryLogs = generateMethodLogs('linkRepository');


const linkRepository = async (
    input: InputLinkRepository,
    context: Context,
) => {
    const {
        providerID,
        nameWithOwner,
    } = input;

    const repositoryData = await getRepositoryDataByNameWithOwner(
        providerID,
        nameWithOwner,
    );

    if (!repositoryData) {
        return {
            status: false,
        };
    }

    const {
        name,
    } = repositoryData;

    if (!name) {
        return {
            status: false,
        };
    }

    await getRepository(
        providerID,
        name,
    );

    await registerRepositoryMetadata(
        repositoryData,
    );

    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default linkRepository;
// #endregion exports
