// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Deploys,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    clearDeploys: (
        _: any,
        __: any,
        context: Context,
    ) => Deploys.Mutation.clearDeploys(
        context,
    ),
};
// #endregion exports
