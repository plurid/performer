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



export const registerWebhook = async (
    hookPath: string,
    provider: CodeProvider,
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
    hookpath: string,
    provider: CodeProvider,
    instance: express.Express,
) => {
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
            path: hookpath,
            provider,
        } = webhook;

        handleWebhook(
            hookpath,
            provider,
            instance,
        );
    }
}
