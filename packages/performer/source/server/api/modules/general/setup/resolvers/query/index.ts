import {
    Setup,
} from '#server/api/models';



export default {
    getSetup: (
        _: any,
        { input }: any,
        context: any,
    ) => Setup.Query.getSetup(input),
};
