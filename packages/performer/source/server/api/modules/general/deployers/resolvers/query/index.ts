import {
    Context,
} from '#server/data/interfaces';

import {
    Deployers,
} from '#server/api/models';



export default {
    getDeployers: (
        _: any,
        __: any,
        context: Context,
    ) => Deployers.Query.getDeployers(
        context,
    ),
};
