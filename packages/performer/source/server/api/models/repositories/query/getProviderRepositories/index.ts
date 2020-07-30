import {
    Context,
} from '#server/data/interfaces';

import {
    getRepositoriesData,
} from '#server/api/requesters';

import {
    compareValues,
} from '#server/utilities';



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

    const sortedRepositories = repositories.sort(compareValues('name'));

    return {
        status: true,
        data: [
            ...sortedRepositories,
        ],
    };
}


export default getProviderRepositories;
