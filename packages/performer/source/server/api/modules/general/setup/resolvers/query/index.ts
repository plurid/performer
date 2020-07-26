import {
    Context,
} from '#server/data/interfaces';

import {
    Setup,
} from '#server/api/models';



export default {
    getSetup: (
        _: any,
        __: any,
        context: Context,
    ) => Setup.Query.getSetup(
        context,
    ),
};
