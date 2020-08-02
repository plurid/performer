import {
    Context,
} from '#server/data/interfaces';

import {
    Builds,
} from '#server/api/models';



export default {
    getBuild: (
        _: any,
        { input }: any,
        context: Context,
    ) => Builds.Query.getBuild(
        input,
        context,
    ),
    getBuildLogs: (
        _: any,
        { input }: any,
        context: Context,
    ) => Builds.Query.getBuildLogs(
        input,
        context,
    ),
    getBuilds: (
        _: any,
        __: any,
        context: Context,
    ) => Builds.Query.getBuilds(
        context,
    ),
};
