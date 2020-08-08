import {
    Context,
} from '#server/data/interfaces';

import {
    Deploys,
} from '#server/api/models';



export default {
    clearDeploys: (
        _: any,
        __: any,
        context: Context,
    ) => Deploys.Mutation.clearDeploys(
        context,
    ),
};
