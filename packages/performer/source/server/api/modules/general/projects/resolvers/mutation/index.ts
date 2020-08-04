import {
    Context,
} from '#server/data/interfaces';

import {
    Projects,
} from '#server/api/models';



export default {
    generateProject: (
        _: any,
        { input }: any,
        context: Context,
    ) => Projects.Mutation.generateProject(
        input,
    ),
    obliterateProject: (
        _: any,
        { input }: any,
        context: Context,
    ) => Projects.Mutation.obliterateProject(
        input,
        context,
    ),
};
