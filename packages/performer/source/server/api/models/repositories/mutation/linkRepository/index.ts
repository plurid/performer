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
        zipURL,
        name,
    } = repositoryData;

    if (!zipURL) {
        return {
            status: false,
        };
    }

    await getRepository(
        providerID,
        zipURL,
        name,
    );

    await registerRepositoryMetadata(repositoryData);

    return {
        status: true,
    };
}


export default linkRepository;
