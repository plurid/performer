// #region imports
    // #region libraries
    import path from 'path';

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
    } from '#server/data/interfaces';

    import {
        webhooksPath,
    } from '#server/data/constants';

    import {
        getProvider,
    } from '#server/api/requesters';

    import github from '#server/api/requesters/github';

    import storage from '#server/services/storage';

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
    const hookData: Webhook = {
        id,
        path: hookPath,
        provider,
    };

    const hookFilePath = path.join(
        webhooksPath,
        id + '.json',
    );

    storage.upload(
        hookFilePath,
        Buffer.from(JSON.stringify(hookData, null, 4), 'utf-8'),
    );
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

    registerWebhook(
        provider.type,
        path,
    );

    handleWebhook(
        provider.type,
        path,
        instance,
    );
}


export const deregisterWebhook = async (
    id: string,
) => {
    try {
        // const webhookPath = path.join(
        //     webhooksPath,
        //     id + '.json',
        // );

        // if (!fs.existsSync(webhookPath)) {
        //     return;
        // }

        // fs.promises.unlink(webhookPath);
    } catch (error) {
        return;
    }
}
// #endregion module
