import {
    Context,
} from '#server/data/interfaces';

import {
    Repositories,
} from '#server/api/models';



export default {
    getRepositories: (
        _: any,
        __: any,
        context: Context,
    ) => Repositories.Query.getRepositories(
        context,
    ),
};
