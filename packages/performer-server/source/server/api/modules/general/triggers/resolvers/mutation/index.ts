// #region imports
    // #region external
    import {
        Context,
        InputOf,
        InputGenerateTrigger,
        InputValueString,
    } from '~server/data/interfaces';

    import {
        Triggers,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    generateTrigger: (
        _: any,
        { input }: InputOf<InputGenerateTrigger>,
        context: Context,
    ) => Triggers.Mutation.generateTrigger(
        input,
        context,
    ),
    updateTrigger: (
        _: any,
        { input }: InputOf<InputGenerateTrigger>,
        context: Context,
    ) => Triggers.Mutation.updateTrigger(
        input,
        context,
    ),
    obliterateTrigger: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Triggers.Mutation.obliterateTrigger(
        input,
        context,
    ),
};
// #endregion exports
