import {
    Context,
} from '#server/data/interfaces';

import {
    Repositories,
} from '#server/api/models';



export default {
    linkRepository: (
        _: any,
        { input }: any,
        context: Context,
    ) => Repositories.Mutation.linkRepository(
        input,
        context,
    ),
};
