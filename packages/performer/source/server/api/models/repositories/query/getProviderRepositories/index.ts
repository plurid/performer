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
        providerID,
    } = input;

    const repositories = await getRepositoriesData(
        providerID,
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
