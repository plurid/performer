import express from 'express';

import {
    promises as fs,
} from 'fs';
import path from 'path';

import {
    uuid,
} from '@plurid/plurid-functions';

import {
    CodeProvider,
} from '#server/data/interfaces';

import {
    BASE_PATH,
    BASE_PATH_WEBHOOKS,
} from '#server/data/constants';



const handleGithubWebhook = (
    request: express.Request,
    response: express.Response,
) => {
    console.log(request.body);
}


const saveHook = async (
    hookPath: string,
    provider: CodeProvider,
) => {
    const id = uuid.generate();
    const hookData = {
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


const registerHook = (
    hookpath: string,
    provider: CodeProvider,
    instance: express.Express,
) => {
    saveHook(
        hookpath,
        provider,
    );

    switch (provider) {
        case 'bitbucket':
            break;
        case 'github':
            instance.get(
                hookpath,
                handleGithubWebhook,
            );
            break;
    }
}


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

    registerHook(
        path,
        provider,
        instance,
    );

    return {
        status: true,
    };
}


export default setupWebhook;
