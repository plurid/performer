import {
    registerWebhook,
    handleWebhook,
} from '#server/logic/webhooks';



const setupWebhook = async (
    input: any,
    context: any,
) => {
    const {
        path,
        provider,
    } = input;

    const {
        instance,
    } = context;

    registerWebhook(
        path,
        provider,
    );

    handleWebhook(
        path,
        provider,
        instance,
    );

    return {
        status: true,
    };
}


export default setupWebhook;
