// #region imports
    // #region libraries
    import {
        Application,
    } from 'express';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        CodeProvider,
        Webhook,
        InputSetupWebhook,
        InputUpdateWebhook,
        InputValueString,
    } from '#server/data/interfaces';

    import {
        getProvider,
    } from '#server/api/requesters';

    import github from '#server/api/requesters/github';

    import database from '#server/services/database';

    import {
        getRoutes,
        delistenRoute,
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


export const updateWebhook = async (
    id: string,
    provider: CodeProvider,
    hookPath: string,
    instance: Application,
) => {
    const previousWebhook: Webhook | undefined = await database.get(
        'webhook',
        id,
    );

    if (!previousWebhook) {
        return;
    }

    dehandleWebhook(
        previousWebhook.path,
        instance,
    );

    const webhook: Webhook = {
        id,
        path: hookPath,
        provider,
    };

    await database.update(
        'webhook',
        id,
        'path',
        hookPath,
    );

    return webhook;
}


export const handleWebhook = (
    provider: CodeProvider,
    hookpath: string,
    instance: Application,
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


export const dehandleWebhook = (
    hookpath: string,
    instance: Application,
) => {
    delistenRoute(
        hookpath,
        instance,
    );
}


export const handleWebhooks = (
    webhooks: Webhook[],
    instance: Application,
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
    input: InputSetupWebhook | InputUpdateWebhook,
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

    let webhook;

    if ((input as InputUpdateWebhook).id) {
        webhook = await updateWebhook(
            (input as InputUpdateWebhook).id,
            provider.type,
            path,
            instance,
        );
    } else {
        webhook = await registerWebhook(
            provider.type,
            path,
        );
    }

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


export const checkValidWebhookPath = (
    path: string,
) => {
    if (!path.startsWith('/')) {
        return;
    }

    const invalidPaths = [
        '',
        '/',
    ];

    if (invalidPaths.includes(path)) {
        return;
    }

    return true;
}
// #endregion module
