// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        Deployers,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    getDeployers: (
        _: any,
        __: any,
        context: Context,
    ) => Deployers.Query.getDeployers(
        context,
    ),
};
// #endregion exports
