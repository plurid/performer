// #region imports
    // #region external
    import {
        Context,
        InputOf,
        InputSetupNotifier,
        InputUpdateNotifier,
        InputValueString,
    } from '#server/data/interfaces';

    import {
        Notifiers,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    setupNotifier: (
        _: any,
        { input }: InputOf<InputSetupNotifier>,
        context: Context,
    ) => Notifiers.Mutation.setupNotifier(
        input,
        context,
    ),
    updateNotifier: (
        _: any,
        { input }: InputOf<InputUpdateNotifier>,
        context: Context,
    ) => Notifiers.Mutation.updateNotifier(
        input,
        context,
    ),
    obliterateNotifier: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Notifiers.Mutation.obliterateNotifier(
        input,
        context,
    ),
};
// #endregion exports
