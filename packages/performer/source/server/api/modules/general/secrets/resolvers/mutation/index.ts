import {
    Context,
} from '#server/data/interfaces';

import {
    Secrets,
} from '#server/api/models';



export default {
    generateSecretsKeychain: (
        _: any,
        { input }: any,
        context: Context,
    ) => Secrets.Mutation.generateSecretsKeychain(
        input,
        context,
    ),
};
