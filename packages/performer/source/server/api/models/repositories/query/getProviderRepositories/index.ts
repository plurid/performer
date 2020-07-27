import {
    Context,
} from '#server/data/interfaces';

import {
    getRepositoriesData,
} from '#server/api/requesters';



const getProviderRepositories = (
    input: any,
    context: Context,
) => {
    const {
        provider,
    } = input;

    getRepositoriesData(
        provider,
    );

    return {
        status: true,
    };
}


export default getProviderRepositories;
