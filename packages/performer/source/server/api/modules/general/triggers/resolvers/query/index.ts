import {
    Context,
} from '#server/data/interfaces';

import {
    Triggers,
} from '#server/api/models';



export default {
    getTriggers: (
        _: any,
        __: any,
        context: Context,
    ) => Triggers.Query.getTriggers(
        context,
    ),
};
