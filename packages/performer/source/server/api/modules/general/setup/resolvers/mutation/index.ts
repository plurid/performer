import {
    Context,
} from '#server/data/interfaces';

import {
    Setup,
} from '#server/api/models';



export default {
    initialSetup: (
        _: any,
        { input }: any,
        context: Context,
    ) => Setup.Mutation.initialSetup(
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
