// #region imports
    // #region external
    import {
        Context,
        InputValueString,
    } from '#server/data/interfaces';

    import {
        getRepositoriesData,
    } from '#server/api/requesters';

    import {
        compareValues,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
const getProviderRepositories = async (
    input: InputValueString,
    context: Context,
) => {
    const {
        value: providerID,
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
// #endregion module



// #region exports
export default getProviderRepositories;
// #endregion exports
