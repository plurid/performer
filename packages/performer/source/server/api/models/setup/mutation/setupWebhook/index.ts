import {
    Context,
} from '#server/data/interfaces';

import {
    registerWebhook,
    handleWebhook,
} from '#server/logic/webhooks';

import {
    getProvider,
} from '#server/api/requesters';



const setupWebhook = async (
    input: any,
    context: Context,
) => {
    const {
        path,
        providerID,
    } = input;

    const provider = await getProvider(providerID);
    if (!provider) {
        return;
    }

    const {
        instance,
    } = context;

    registerWebhook(
        provider.type,
        path,
    );

    handleWebhook(
        provider.type,
        path,
        instance,
    );

    return {
        status: true,
    };
}


export default setupWebhook;
