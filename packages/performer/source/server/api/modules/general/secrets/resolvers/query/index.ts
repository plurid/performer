import {
    Context,
} from '#server/data/interfaces';

import {
    Secrets,
} from '#server/api/models';



export default {
    getSecret: (
        _: any,
        { input }: any,
        context: Context,
    ) => Secrets.Query.getSecret(
        input,
        context,
    ),
};
