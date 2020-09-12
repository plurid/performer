// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Triggers,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    getTriggers: (
        _: any,
        __: any,
        context: Context,
    ) => Triggers.Query.getTriggers(
        context,
    ),
};
// #endregion exports
