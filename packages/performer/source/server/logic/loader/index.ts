import {
    promises as fs,
} from 'fs';
import path from 'path';

import {
    Provider,
    Repository,
    Webhook,
    Trigger,
    Build,
    BuildData,
    Imagene,
} from '#server/data/interfaces';

import {
    providersPath,
    repositoriesMetadataPath,
    webhooksPath,
    triggersPath,
    buildsPath,
    buildqueuePath,
    imagenesPath,
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

    return providers;
}


export const loadRepositories = async () => {
    const repositories = await loadDataFromFiles<Repository>(repositoriesMetadataPath);

    return repositories;
}


export const loadWebhooks = async () => {
    const webhooks = await loadDataFromFiles<Webhook>(webhooksPath);

    return webhooks;
}


export const loadTriggers = async () => {
    const triggers = await loadDataFromFiles<Trigger>(triggersPath);

    return triggers;
}


export const loadBuildsQueued = async () => {
    const buildsQueued = await loadDataFromFiles<BuildData>(buildqueuePath);

    return buildsQueued;
}


export const loadBuilds = async () => {
    const builds = await loadDataFromFiles<Build>(buildsPath);

    const sortedBuilds = builds.sort(
        compareValues('date', 'desc'),
    );

    return sortedBuilds;
}


export const loadImagenes = async () => {
    const imagenes = await loadDataFromFiles<Imagene>(imagenesPath);

    const sortedImagenes = imagenes.sort(
        compareValues('name'),
    );

    return sortedImagenes;
}


const loadData = async () => {
    const providers = await loadProviders();
    const repositories = await loadRepositories();
    const webhooks = await loadWebhooks();
    const triggers = await loadTriggers();
    const builds = await loadBuilds();
    const imagenes = await loadImagenes();

    const data = {
        providers,
        webhooks,
        triggers,
        repositories,
        builds,
        imagenes,
    };

    return data;
}


export default loadData;
