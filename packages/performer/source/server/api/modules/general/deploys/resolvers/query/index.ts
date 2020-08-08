import {
    Context,
} from '#server/data/interfaces';

import {
    Deploys,
} from '#server/api/models';



export default {
    getDeploy: (
        _: any,
        { input }: any,
        context: Context,
    ) => Deploys.Query.getDeploy(
        input,
        context,
    ),
    getDeployLogs: (
        _: any,
        { input }: any,
        context: Context,
    ) => Deploys.Query.getDeployLogs(
        input,
        context,
    ),
    getDeploys: (
        _: any,
        __: any,
        context: Context,
    ) => Deploys.Query.getDeploys(
        context,
    ),
};
