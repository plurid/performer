// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Providers,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    setupProvider: (
        _: any,
        { input }: any,
        context: Context,
    ) => Providers.Mutation.setupProvider(
        input,
        context,
    ),
    obliterateProvider: (
        _: any,
        { input }: any,
        context: Context,
    ) => Providers.Mutation.obliterateProvider(
        input,
        context,
    ),
};
// #endregion exports
