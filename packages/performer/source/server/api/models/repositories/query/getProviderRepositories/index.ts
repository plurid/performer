import {
    Context,
} from '#server/data/interfaces';

import {
    getRepositoriesData,
} from '#server/api/requesters';



const getProviderRepositories = async (
    input: any,
    context: Context,
) => {
    const {
        provider,
    } = input;

    const repositories = await getRepositoriesData(
        provider,
    );

    if (!repositories) {
        return {
            status: false,
        };
    }

    return {
        status: true,
        data: repositories,
    };
}


export default getProviderRepositories;
