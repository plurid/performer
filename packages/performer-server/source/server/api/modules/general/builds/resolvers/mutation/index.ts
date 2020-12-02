// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        Builds,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    clearBuilds: (
        _: any,
        __: any,
        context: Context,
    ) => Builds.Mutation.clearBuilds(
        context,
    ),
};
// #endregion exports
