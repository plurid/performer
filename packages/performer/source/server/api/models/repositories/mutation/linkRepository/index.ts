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


export default linkRepository;
