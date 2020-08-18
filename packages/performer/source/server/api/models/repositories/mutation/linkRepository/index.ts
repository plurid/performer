// #region imports
import {
    Context,
} from '#server/data/interfaces';

import {
    getRepository,
    getRepositoryDataByNameWithOwner,
} from '#server/api/requesters';

import {
    registerRepositoryMetadata,
} from '#server/logic/repository';
// #endregion imports



// #region module
const linkRepository = async (
    input: any,
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
