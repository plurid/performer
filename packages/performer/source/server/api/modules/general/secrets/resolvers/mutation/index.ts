// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Secrets,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    storeSecret: (
        _: any,
        { input }: any,
        context: Context,
    ) => Secrets.Mutation.storeSecret(
        input,
        context,
    ),
    obliterateSecret: (
        _: any,
        { input }: any,
        context: Context,
    ) => Secrets.Mutation.obliterateSecret(
        input,
        context,
    ),
};
// #endregion exports
