import {
    Context,
} from '#server/data/interfaces';

import {
    getRepositoriesData,
} from '#server/api/requesters';



const compare = (
    a: any,
    b: any,
) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    let comparison = 0;

    if (nameA > nameB) {
        comparison = 1;
    } else if (nameA < nameB) {
        comparison = -1;
    }

    return comparison;
}


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

    const sortedRepositories = repositories.sort(compare);

    return {
        status: true,
        data: [
            ...sortedRepositories,
        ],
    };
}


export default getProviderRepositories;
