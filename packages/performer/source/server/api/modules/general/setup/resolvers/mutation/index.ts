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
    obliterateProvider: (
        _: any,
        { input }: any,
        context: Context,
    ) => Setup.Mutation.obliterateProvider(
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
    obliterateWebhook: (
        _: any,
        { input }: any,
        context: Context,
    ) => Setup.Mutation.obliterateWebhook(
        input,
        context,
    ),
};
