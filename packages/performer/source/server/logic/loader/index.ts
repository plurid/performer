// #region imports
    // #region external
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
        BASE_PATH_PROVIDERS,
        BASE_PATH_IMAGENES,
        BASE_PATH_REPOSITORIES_METADATA,
        BASE_PATH_WEBHOOKS,
        BASE_PATH_PROJECTS,
        BASE_PATH_SECRETS,
        BASE_PATH_TRIGGERS,
        BASE_PATH_DEPLOYERS,
        BASE_PATH_BUILDS,
        BASE_PATH_BUILD_QUEUE,
        BASE_PATH_DEPLOYS,
    } from '#server/data/constants';

    import {
        compareValues,
    } from '#server/utilities';

    import storage from '#server/services/storage';
    // #endregion external
// #endregion imports



// #region module
export const loadProviders = async () => {
    const providers: Provider[] = await storage.downloadAll(BASE_PATH_PROVIDERS);

    return providers || [];
}


export const loadImagenes = async () => {
    const imagenes: Imagene[] = await storage.downloadAll(BASE_PATH_IMAGENES);

    const sortedImagenes = imagenes.sort(
        compareValues('name'),
    );

    return sortedImagenes || [];
}


export const loadRepositories = async () => {
    const repositories: Repository[] = await storage.downloadAll(BASE_PATH_REPOSITORIES_METADATA);

    return repositories || [];
}


export const loadWebhooks = async () => {
    const webhooks: Webhook[] = await storage.downloadAll(BASE_PATH_WEBHOOKS);

    return webhooks || [];
}


export const loadProjects = async () => {
    const projects: Project[] = await storage.downloadAll(BASE_PATH_PROJECTS);

    return projects || [];
}


export const loadStoredSecrets = async () => {
    const storedSecrets: SecretStored[] = await storage.downloadAll(BASE_PATH_SECRETS);

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
    const triggers: Trigger[] = await storage.downloadAll(BASE_PATH_TRIGGERS);

    return triggers || [];
}


export const loadDeployers = async () => {
    const deployers: Deployer[] = await storage.downloadAll(BASE_PATH_DEPLOYERS);

    return deployers || [];
}


export const loadBuildsQueued = async () => {
    const buildsQueued: BuildData[] = await storage.downloadAll(BASE_PATH_BUILD_QUEUE);

    return buildsQueued || [];
}


export const loadBuilds = async () => {
    const builds: Build[] = await storage.downloadAll(BASE_PATH_BUILDS);

    const sortedBuilds = builds.sort(
        compareValues('date', 'desc'),
    );

    return sortedBuilds || [];
}


export const loadDeploys = async () => {
    const deploys: Deploy[] = await storage.downloadAll(BASE_PATH_DEPLOYS);

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
// #endregion module



// #region exports
export default loadData;
// #endregion exports
