import {
    promises as fs,
} from 'fs';
import path from 'path';

import {
    Provider,
    Imagene,
    Repository,
    Project,
    Secret,
    SecretStored,
    Webhook,
    Trigger,
    Deployer,
    Build,
    BuildData,
    Deploy,
} from '#server/data/interfaces';

import {
    imagenesPath,
    providersPath,
    repositoriesMetadataPath,
    webhooksPath,
    projectsPath,
    secretsPath,
    triggersPath,
    deployersPath,
    buildsPath,
    buildQueuePath,
    deploysPath,
} from '#server/data/constants';

import {
    compareValues,
} from '#server/utilities';



const loadDataFromFiles = async <T>(
    filespath: string,
): Promise<T[]> => {
    try {
        const files = await fs.readdir(filespath);
        const items: T[] = [];

        for (const file of files) {
            const filepath = path.join(filespath, file);
            const data = await fs.readFile(filepath, 'utf-8');
            const item = JSON.parse(data);
            items.push(item);
        }

        return items;
    } catch (error) {
        return [];
    }
}


export const loadProviders = async () => {
    const providers = await loadDataFromFiles<Provider>(providersPath);

    return providers || [];
}


export const loadImagenes = async () => {
    const imagenes = await loadDataFromFiles<Imagene>(imagenesPath);

    const sortedImagenes = imagenes.sort(
        compareValues('name'),
    );

    return sortedImagenes || [];
}


export const loadRepositories = async () => {
    const repositories = await loadDataFromFiles<Repository>(repositoriesMetadataPath);

    return repositories || [];
}


export const loadWebhooks = async () => {
    const webhooks = await loadDataFromFiles<Webhook>(webhooksPath);

    return webhooks || [];
}


export const loadProjects = async () => {
    const projects = await loadDataFromFiles<Project>(projectsPath);

    return projects || [];
}


export const loadStoredSecrets = async () => {
    const storedSecrets = await loadDataFromFiles<SecretStored>(secretsPath);

    return storedSecrets || [];
}


export const loadSecrets = async () => {
    const storedSecrets = await loadStoredSecrets();
    const secrets = storedSecrets.map(storedSecret => {
        const {
            id,
            name,
            project,
            value,
        } = storedSecret;

        const secret: Secret = {
            id,
            name,
            project,
            endsWith: value.substr(value.length - 4),
        };

        return secret;
    });

    return secrets;
}


export const loadTriggers = async () => {
    const triggers = await loadDataFromFiles<Trigger>(triggersPath);

    return triggers || [];
}


export const loadDeployers = async () => {
    const deployers = await loadDataFromFiles<Deployer>(deployersPath);

    return deployers || [];
}


export const loadBuildsQueued = async () => {
    const buildsQueued = await loadDataFromFiles<BuildData>(buildQueuePath);

    return buildsQueued || [];
}


export const loadBuilds = async () => {
    const builds = await loadDataFromFiles<Build>(buildsPath);

    const sortedBuilds = builds.sort(
        compareValues('date', 'desc'),
    );

    return sortedBuilds || [];
}


export const loadDeploys = async () => {
    const deploys = await loadDataFromFiles<Deploy>(deploysPath);

    const sortedDeploys = deploys.sort(
        compareValues('date', 'desc'),
    );

    return sortedDeploys || [];
}


const loadData = async () => {
    const providers = await loadProviders();
    const imagenes = await loadImagenes();
    const repositories = await loadRepositories();
    const webhooks = await loadWebhooks();
    const projects = await loadProjects();
    const secrets = await loadSecrets();
    const triggers = await loadTriggers();
    const deployers = await loadDeployers();
    const builds = await loadBuilds();
    const deploys = await loadDeploys();


    const data = {
        providers,
        imagenes,
        repositories,
        webhooks,
        projects,
        secrets,
        triggers,
        deployers,
        builds,
        deploys,
    };

    return data;
}


export default loadData;
