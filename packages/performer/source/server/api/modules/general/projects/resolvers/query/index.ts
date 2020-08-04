import {
    Context,
} from '#server/data/interfaces';

import {
    Projects,
} from '#server/api/models';



export default {
    getProjects: (
        _: any,
        __: any,
        context: Context,
    ) => Projects.Query.getProjects(
        context,
    ),
};
