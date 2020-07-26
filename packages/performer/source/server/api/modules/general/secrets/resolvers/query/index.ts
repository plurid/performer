import {
    Secrets,
} from '#server/api/models';



export default {
    getSecret: (
        _: any,
        { input }: any,
        context: any,
    ) => Secrets.Query.getSecret(input),
};
