import {
    Repositories,
} from '#server/api/models';



export default {
    linkRepository: (
        _: any,
        { input }: any,
        context: any,
    ) => Repositories.Mutation.linkRepository(
        input,
        context,
    ),
};
