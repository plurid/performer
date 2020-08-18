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
    generateTrigger: (
        _: any,
        { input }: any,
        context: Context,
    ) => Triggers.Mutation.generateTrigger(
        input,
        context,
    ),
    obliterateTrigger: (
        _: any,
        { input }: any,
        context: Context,
    ) => Triggers.Mutation.obliterateTrigger(
        input,
        context,
    ),
};
// #endregion exports
