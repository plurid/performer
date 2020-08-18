import {
    Context,
} from '#server/data/interfaces';

import {
    Webhooks,
} from '#server/api/models';



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
