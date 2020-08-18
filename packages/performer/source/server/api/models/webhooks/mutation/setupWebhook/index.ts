// #region imports
    // #region external
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
    // #endregion external
// #endregion imports



// #region module
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
// #endregion module



// #region exports
export default setupWebhook;
// #endregion exports
