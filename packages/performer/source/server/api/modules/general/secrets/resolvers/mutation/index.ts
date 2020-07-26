import {
    Secrets,
} from '#server/api/models';



export default {
    generateSecretsKeychain: (
        _: any,
        { input }: any,
        context: any,
    ) => Secrets.Mutation.generateSecretsKeychain(input),
};
