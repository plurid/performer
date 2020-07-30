import {
    Context,
} from '#server/data/interfaces';

import {
    Builds,
} from '#server/api/models';



export default {
    clearBuilds: (
        _: any,
        __: any,
        context: Context,
    ) => Builds.Mutation.clearBuilds(
        context,
    ),
};
