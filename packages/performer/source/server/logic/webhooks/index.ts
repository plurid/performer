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
    Repository,
    Trigger,
    Build,
} from '#server/data/interfaces';

import {
    webhooksPath,
} from '#server/data/constants';

import {
    getRoutes,
} from '#server/utilities';

import {
    loadRepositories,
    loadTriggers,
} from '#server/logic/loader';



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
    const data = request.body;

    const {
        ref,
        head_commit: headCommit,
        repository,
    } = data;

    const branchName = ref.replace('refs/heads/', '');
    const repositoryName = repository.full_name;

    const repositories = await loadRepositories();
    let activeRepository: Repository | undefined;
    for (const watchedRepository of repositories) {
        if (watchedRepository.name === repositoryName) {
            activeRepository = {
                ...watchedRepository,
            };
        }
    }

    if (!activeRepository) {
        response.status(404).end();
        return;
    }

    const triggers = await loadTriggers();
    let activeTrigger: Trigger | undefined;
    for (const watchedTrigger of triggers) {
        let triggerSet = false;
        if (watchedTrigger.branch === branchName) {
            for (const addedFile of headCommit.added) {
                if (addedFile.includes(watchedTrigger.path)) {
                    activeTrigger = {
                        ...watchedTrigger,
                    };
                    triggerSet = true;
                    break;
                }
            }

            if (triggerSet) {
                break;
            }

            for (const removedFile of headCommit.removed) {
                if (removedFile.includes(watchedTrigger.path)) {
                    activeTrigger = {
                        ...watchedTrigger,
                    };
                    triggerSet = true;
                    break;
                }
            }

            if (triggerSet) {
                break;
            }

            for (const modifiedFile of headCommit.modified) {
                if (modifiedFile.includes(watchedTrigger.path)) {
                    activeTrigger = {
                        ...watchedTrigger,
                    };
                    triggerSet = true;
                    break;
                }
            }

            if (triggerSet) {
                break;
            }
        }
    }

    if (!activeTrigger) {
        response.status(404).end();
        return;
    }

    const buildData = {
        commit: headCommit.id,
        branch: branchName,
        trigger: activeTrigger.name,
        date: Math.floor(Date.now() / 1000),
    };

    console.log('body', request.body);
    console.log('-----');
    console.log('buildData', buildData);

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
