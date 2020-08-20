// #region imports
    // #region libraries
    import express from 'express';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        CodeProvider,
        Webhook,
        InputSetupWebhook,
        InputValueString,
    } from '#server/data/interfaces';

    import {
        getProvider,
    } from '#server/api/requesters';

    import github from '#server/api/requesters/github';

    import database from '#server/services/database';

    import {
        getRoutes,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const registerWebhook = async (
    provider: CodeProvider,
    hookPath: string,
) => {
    const id = uuid.generate();
    const webhook: Webhook = {
        id,
        path: hookPath,
        provider,
    };

    await database.store(
        'webhook',
        id,
        webhook,
    );

    return webhook;
}


export const handleWebhook = (
    provider: CodeProvider,
    hookpath: string,
    instance: express.Application,
) => {
    const routes = getRoutes(instance);
    if (routes.includes(hookpath)) {
        return;
    }

    switch (provider) {
        case 'bitbucket':
            break;
        case 'github':
            instance.post(
                hookpath,
                github.handleWebhook,
            );
            break;
    }
}


export const handleWebhooks = (
    webhooks: Webhook[],
    instance: express.Application,
) => {
    for (const webhook of webhooks) {
        const {
            provider,
            path: hookpath,
        } = webhook;

        handleWebhook(
            provider,
            hookpath,
            instance,
        );
    }
}


export const handleRegisterWebhook = async (
    input: InputSetupWebhook,
    instance: any,
) => {
    const {
        path,
        providerID,
    } = input;

    const provider = await getProvider(providerID);
    if (!provider) {
        return;
    }

    const webhook = await registerWebhook(
        provider.type,
        path,
    );

    handleWebhook(
        provider.type,
        path,
        instance,
    );

    return webhook;
}


export const deregisterWebhook = async (
    input: InputValueString,
) => {
    await database.obliterate(
        'webhook',
        input.value,
    );
}
// #endregion module
