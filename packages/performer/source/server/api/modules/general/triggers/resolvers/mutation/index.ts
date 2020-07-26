import {
    Context,
} from '#server/data/interfaces';

import {
    Triggers,
} from '#server/api/models';



export default {
    addTrigger: (
        _: any,
        { input }: any,
        context: Context,
    ) => Triggers.Mutation.addTrigger(
        input,
    ),
};
