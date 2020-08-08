import {
    Context,
} from '#server/data/interfaces';

import {
    Deployers,
} from '#server/api/models';



export default {
    generateDeployer: (
        _: any,
        { input }: any,
        context: Context,
    ) => Deployers.Mutation.generateDeployer(
        input,
        context,
    ),
    obliterateDeployer: (
        _: any,
        { input }: any,
        context: Context,
    ) => Deployers.Mutation.obliterateDeployer(
        input,
        context,
    ),
};
