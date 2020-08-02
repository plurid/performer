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
    Commit,
} from '#server/data/interfaces';

import {
    webhooksPath,
} from '#server/data/constants';

import {
    getRoutes,
} from '#server/utilities/routes';

import {
    getActiveRepository,
    updateRootRepository,
} from '#server/logic/repository';

import {
    handleTriggers,
} from '#server/logic/triggers';



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

    await fs.writeFile(
        hookFilePath,
        JSON.stringify(hookData, null, 4),
    );
}



export const handleGithubWebhook = async (
    request: express.Request,
    response: express.Response,
) => {
    try {
        const data = request.body;

        const {
            ref,
            head_commit: headCommit,
            repository,
        } = data;

        if (
            !ref
            || !headCommit
            || !repository
        ) {
            /** No Content */
            response.status(204).end();
            return;
        }

        const branchName = ref.replace('refs/heads/', '');
        const repositoryName = repository.full_name;

        const activeRepository = await getActiveRepository(
            repositoryName,
        );
        if (!activeRepository) {
            /** No Content */
            response.status(204).end();
            return;
        }

        /** OK */
        response.status(200).end();

        await updateRootRepository(
            repositoryName,
        );

        const commit: Commit = {
            id: headCommit.id,
            added: headCommit.added,
            removed: headCommit.removed,
            modified: headCommit.modified,
        };

        await handleTriggers(
            commit,
            branchName,
            repositoryName,
        );
    } catch (error) {
        /** Bad Request */
        response.status(400).end();
        return;
    }
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
