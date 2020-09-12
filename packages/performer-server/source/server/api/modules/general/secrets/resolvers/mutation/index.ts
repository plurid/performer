// #region imports
    // #region external
    import {
        Context,
        InputOf,
        InputStoreSecret,
        InputValueString,
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
        { input }: InputOf<InputStoreSecret>,
        context: Context,
    ) => Secrets.Mutation.storeSecret(
        input,
        context,
    ),
    obliterateSecret: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Secrets.Mutation.obliterateSecret(
        input,
        context,
    ),
};
// #endregion exports
