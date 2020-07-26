import {
    Builds,
} from '#server/api/models';



export default {
    getBuild: (
        _: any,
        { input }: any,
        context: any,
    ) => Builds.Query.getBuild(input),
    getBuilds: (
        _: any,
        { input }: any,
        context: any,
    ) => Builds.Query.getBuilds(),
};
