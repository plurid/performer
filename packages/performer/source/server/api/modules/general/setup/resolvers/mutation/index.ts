import {
    Context,
} from '#server/data/interfaces';

import {
    Setup,
} from '#server/api/models';



export default {
    setupProvider: (
        _: any,
        { input }: any,
        context: Context,
    ) => Setup.Mutation.setupProvider(
        input,
        context,
    ),
    setupWebhook: (
        _: any,
        { input }: any,
        context: Context,
    ) => Setup.Mutation.setupWebhook(
        input,
        context,
    ),
};
