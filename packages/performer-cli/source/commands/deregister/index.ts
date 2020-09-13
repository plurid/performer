// #region imports
    // #region external
    import obliterateEntity from '../obliterateEntity';

    import {
        readConfigurationFile,
        resolveFilepath,
        parseFile,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const deregisterProviders = async (
    providers: any[],
) => {
    if (!providers) {
        return;
    }

    for (const provider of providers) {
        console.log(provider);
    }
}

const deregisterImagenes = async (
    imagenes: any[],
) => {
    if (!imagenes) {
        return;
    }

    for (const imagene of imagenes) {
        console.log(imagene);
    }
}

const deregisterNotifiers = async (
    notifiers: any[],
) => {
    if (!notifiers) {
        return;
    }

    for (const notifier of notifiers) {
        console.log(notifier);
    }
}

const deregisterRepositories = async (
    repositories: any[],
) => {
    if (!repositories) {
        return;
    }

    for (const repository of repositories) {
        console.log(repository);
    }
}

const deregisterWebhooks = async (
    webhooks: any[],
) => {
    if (!webhooks) {
        return;
    }

    for (const webhook of webhooks) {
        console.log(webhook);
    }
}

const deregisterProjects = async (
    projects: any[],
) => {
    if (!projects) {
        return;
    }

    for (const project of projects) {
        console.log(project);
    }
}

const deregisterSecrets = async (
    secrets: any[],
) => {
    if (!secrets) {
        return;
    }

    for (const secret of secrets) {
        console.log(secret);
    }
}

const deregisterTriggers = async (
    triggers: any[],
) => {
    if (!triggers) {
        return;
    }

    for (const trigger of triggers) {
        const {
            id,
        } = trigger;

        // get all triggers
        // check for match

        await obliterateEntity(
            'trigger',
            id,
        );
    }
}

const deregisterDeployers = async (
    deployers: any[],
) => {
    if (!deployers) {
        return;
    }

    for (const deployer of deployers) {
        console.log(deployer);
    }
}


const deregisterFile = async (
    file: string,
) => {
    const filepath = resolveFilepath(file);

    const data = await parseFile(filepath);

    await deregisterProviders(data.providers);
    await deregisterImagenes(data.imagenes);
    await deregisterNotifiers(data.motifiers);
    await deregisterRepositories(data.repositories);
    await deregisterWebhooks(data.webhooks);
    await deregisterProjects(data.projects);
    await deregisterSecrets(data.secrets);
    await deregisterTriggers(data.triggers);
    await deregisterDeployers(data.deployers);
}


const deregister = async (
    files: string[],
) => {
    const ownerData = await readConfigurationFile();

    if (!ownerData.server) {
        console.log(`Not logged into a performer server.`);
        return;
    }

    for (const file of files) {
        await deregisterFile(file);
    }
}
// #endregion module



// #region exports
export default deregister;
// #endregion exports
