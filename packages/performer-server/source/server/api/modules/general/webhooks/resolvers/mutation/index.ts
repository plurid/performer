// #region imports
    // #region external
    import {
        Context,
        InputOf,
        InputSetupWebhook,
        InputUpdateWebhook,
        InputValueString,
    } from '~server/data/interfaces';

    import {
        Webhooks,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    setupWebhook: (
        _: any,
        { input }: InputOf<InputSetupWebhook>,
        context: Context,
    ) => Webhooks.Mutation.setupWebhook(
        input,
        context,
    ),
    updateWebhook: (
        _: any,
        { input }: InputOf<InputUpdateWebhook>,
        context: Context,
    ) => Webhooks.Mutation.updateWebhook(
        input,
        context,
    ),
    obliterateWebhook: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Webhooks.Mutation.obliterateWebhook(
        input,
        context,
    ),
};
// #endregion exports
