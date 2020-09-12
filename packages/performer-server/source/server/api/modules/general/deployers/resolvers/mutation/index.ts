// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Deployers,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    generateDeployer: (
        _: any,
        { input }: any,
        context: Context,
    ) => Deployers.Mutation.generateDeployer(
        input,
        context,
    ),
    obliterateDeployer: (
        _: any,
        { input }: any,
        context: Context,
    ) => Deployers.Mutation.obliterateDeployer(
        input,
        context,
    ),
};
// #endregion exports
