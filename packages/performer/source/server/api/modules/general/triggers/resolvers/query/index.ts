import {
    Triggers,
} from '#server/api/models';



export default {
    getTriggers: (
        _: any,
        { input }: any,
        context: any,
    ) => Triggers.Query.getTriggers(),
};
