import {
    promises as fs,
} from 'fs';

import path from 'path';

import {
    execSync,
} from 'child_process';

import express from 'express';

import ncp from 'ncp';

import yaml from 'js-yaml';

import {
    uuid,
} from '@plurid/plurid-functions';

import {
    CodeProvider,
    Webhook,
    Repository,
    Trigger,
    Build,
    Performer,
    PerformerStage,
} from '#server/data/interfaces';

import {
    webhooksPath,
    repositoriesPath,
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


export const getActiveRepository = async (
    repositoryName: string,
) => {
    const repositories = await loadRepositories();
    let activeRepository: Repository | undefined;
    for (const watchedRepository of repositories) {
        if (watchedRepository.name === repositoryName) {
            activeRepository = {
                ...watchedRepository,
            };
            break;
        }
    }

    return activeRepository;
}


const removeDuplicates = <T>(
    data: T[],
    key: string,
) => {
    return data.filter(
        (obj, pos, arr) => arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos
    );
}


export const getActiveTriggers = async (
    branchName: string,
    headCommit: any,
) => {
    const triggers = await loadTriggers();

    let activeTriggers: Trigger[] = [];

    for (const watchedTrigger of triggers) {
        if (watchedTrigger.branch === branchName) {
            for (const addedFile of headCommit.added) {
                if (addedFile.includes(watchedTrigger.path)) {
                    activeTriggers.push(
                        watchedTrigger,
                    );
                    break;
                }
            }

            for (const removedFile of headCommit.removed) {
                if (removedFile.includes(watchedTrigger.path)) {
                    activeTriggers.push(
                        watchedTrigger,
                    );
                    break;
                }
            }

            for (const modifiedFile of headCommit.modified) {
                if (modifiedFile.includes(watchedTrigger.path)) {
                    activeTriggers.push(
                        watchedTrigger,
                    );
                    break;
                }
            }
        }
    }

    return removeDuplicates(
        activeTriggers,
        'id',
    );
}


export const copyDirectory = async (
    source: string,
    destination: string,
) => {
    return new Promise((resolve, reject) => {
        ncp(source, destination, (error) => {
            if (error) {
                reject(0);
            }

            resolve();
        });
    })
}


const handleTriggers = async (
    headCommit: any,
    branchName: string,
    repositoryName: string,
) => {
    const activeTriggers = await getActiveTriggers(
        branchName,
        headCommit,
    );
    if (activeTriggers.length == 0) {
        return;
    }

    for (const trigger of activeTriggers) {
        handleTrigger(
            headCommit,
            trigger,
            repositoryName,
            branchName,
        );
    }

}


const handleTrigger = async (
    headCommit: any,
    activeTrigger: Trigger,
    repositoryName: string,
    branchName: string,
) => {
    try {
        const buildDate = Math.floor(Date.now() / 1000);
        const buildData = {
            commit: headCommit.id,
            trigger: {
                ...activeTrigger,
            },
            date: buildDate,
        };


        const repositoryPath = path.join(
            repositoriesPath,
            './github',
            '/' + repositoryName,
        );
        const repositoryRootPath = path.join(
            repositoryPath,
            '/root',
        );

        const workDirectory = '/' + headCommit.id + '_' + buildData.trigger.id;
        const workDirectoryPath = path.join(
            repositoryPath,
            workDirectory,
        );
        await fs.mkdir(workDirectoryPath, {
            recursive: true,
        });

        await copyDirectory(
            repositoryRootPath,
            workDirectoryPath,
        );

        const gitCommandFetchOrigin = 'git fetch origin';
        const gitCommandResetHardBranch = `git reset --hard origin/${branchName}`;

        execSync(gitCommandFetchOrigin, {
            cwd: workDirectoryPath,
        });
        execSync(gitCommandResetHardBranch, {
            cwd: workDirectoryPath,
        });


        const performerFilePath = path.join(
            workDirectoryPath,
            '/' + buildData.trigger.file,
        );
        const performerFile = await fs.readFile(performerFilePath, 'utf-8');
        const performerObject = yaml.safeLoad(performerFile);

        if (!performerObject || typeof performerObject === 'string') {
            return;
        }

        const performerData: any = performerObject;

        const performer: Performer = {
            ...performerData,
            timeout: performerData.timeout ?? 600,
        };

        handlePerformer(
            performer,
            workDirectoryPath,
            performerFilePath,
        );
    } catch (error) {
        return;
    }
}


export const handlePerformer = async (
    performer: Performer,
    workDirectoryPath: string,
    performerFilePath: string,
) => {
    const {
        stages,
        timeout,
        nodejs,
        secrets,
    } = performer;

    const performContext = {
        timeout,
        nodejs,
        secrets,
        workDirectoryPath,
        performerFilePath,
    };

    for (const stage of stages) {
        handleStage(
            stage,
            performContext,
        );
    }

    console.log('performer', performer);

}


const handleStage = async (
    stage: PerformerStage,
    performContext: any,
) => {
    const {
        name,
        command,
        imagene,
        directory,
    } = stage;

    const {
        workDirectoryPath,
        performerFilePath,
    } = performContext;

    const imageneCommand = imagene === 'demand' ? '' : imagene;

    const actionCommand = `${imageneCommand} ${command}`;

    const commandDirectory = directory
        ? path.join(
            workDirectoryPath,
            directory,
        ) : path.dirname(performerFilePath);

    execSync(actionCommand, {
        cwd: commandDirectory,
    });
}


const updateRootRepository = (
    repositoryName: string,
) => {
    const repositoryPath = path.join(
        repositoriesPath,
        './github',
        '/' + repositoryName,
    );

    const gitCommandFetchOrigin = 'git fetch origin';

    execSync(gitCommandFetchOrigin, {
        cwd: repositoryPath,
    });
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

        const branchName = ref.replace('refs/heads/', '');
        const repositoryName = repository.full_name;

        const activeRepository = await getActiveRepository(
            repositoryName
        );
        if (!activeRepository) {
            /** No Content */
            response.status(204).end();
            return;
        }

        /** OK */
        response.status(200).end();

        handleTriggers(
            headCommit,
            branchName,
            repositoryName,
        );

        updateRootRepository(
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
