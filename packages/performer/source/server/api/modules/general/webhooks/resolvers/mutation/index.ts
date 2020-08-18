// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Webhooks,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    setupWebhook: (
        _: any,
        { input }: any,
        context: Context,
    ) => Webhooks.Mutation.setupWebhook(
        input,
        context,
    ),
    obliterateWebhook: (
        _: any,
        { input }: any,
        context: Context,
    ) => Webhooks.Mutation.obliterateWebhook(
        input,
        context,
    ),
};
// #endregion exports
