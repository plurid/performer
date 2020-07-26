import {
    Triggers,
} from '#server/api/models';



export default {
    addTrigger: (
        _: any,
        { input }: any,
        context: any,
    ) => Triggers.Mutation.addTrigger(input),
};
