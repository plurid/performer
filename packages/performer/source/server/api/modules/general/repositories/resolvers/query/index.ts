// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Repositories,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    getRepositories: (
        _: any,
        __: any,
        context: Context,
    ) => Repositories.Query.getRepositories(
        context,
    ),
    getProviderRepositories: (
        _: any,
        { input }: any,
        context: Context,
    ) => Repositories.Query.getProviderRepositories(
        input,
        context,
    ),
};
// #endregion exports
