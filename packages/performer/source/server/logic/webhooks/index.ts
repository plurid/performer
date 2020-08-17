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
    } from '#server/data/interfaces';

    import {
        webhooksPath,
    } from '#server/data/constants';

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
// #endregion module
