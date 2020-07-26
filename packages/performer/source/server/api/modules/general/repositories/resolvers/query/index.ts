import {
    Repositories,
} from '#server/api/models';



export default {
    getRepositories: (
        _: any,
        { input }: any,
        context: any,
    ) => Repositories.Query.getRepositories(),
};
