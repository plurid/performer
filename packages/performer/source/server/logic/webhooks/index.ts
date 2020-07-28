import {
    promises as fs,
} from 'fs';

import path from 'path';

import express from 'express';

import {
    uuid,
} from '@plurid/plurid-functions';

import {
    CodeProvider,
    Webhook,
} from '#server/data/interfaces';

import {
    BASE_PATH,
    BASE_PATH_WEBHOOKS,
} from '#server/data/constants';

import {
    getRoutes,
} from '#server/utilities';



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
        BASE_PATH,
        BASE_PATH_WEBHOOKS,
        id + '.json',
    );

    await fs.writeFile(
        hookFilePath,
        JSON.stringify(hookData, null, 4),
    );
}


export const handleGithubWebhook = (
    request: express.Request,
    response: express.Response,
) => {
    console.log(request.body);

    response.status(200).end();
}


export const handleWebhook = (
    provider: CodeProvider,
    hookpath: string,
    instance: express.Express,
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
                handleGithubWebhook,
            );
            break;
    }
}


export const handleWebhooks = (
    webhooks: Webhook[],
    instance: express.Express,
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
