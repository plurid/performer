import {
    GITHUB_PROVIDER,
} from '#server/data/constants';

import {
    Context,
} from '#server/data/interfaces';

import {
    getRepository,
    getRepositoryDataByNameWithOwner,
} from '#server/api/requesters';



const linkRepository = async (
    input: any,
    context: Context,
) => {
    const {
        nameWithOwner,
        provider,
    } = input;

    const repositoryData = await getRepositoryDataByNameWithOwner(
        provider,
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
        GITHUB_PROVIDER,
        zipURL,
        name,
    );

    return {
        status: true,
    };
}


export default linkRepository;
