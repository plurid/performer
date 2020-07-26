import {
    Setup,
} from '#server/api/models';



export default {
    initialSetup: (
        _: any,
        { input }: any,
        context: any,
    ) => Setup.Mutation.initialSetup(input),
    setupWebhook: (
        _: any,
        { input }: any,
        context: any,
    ) => Setup.Mutation.setupWebhook(
        input,
        context,
    ),
};
