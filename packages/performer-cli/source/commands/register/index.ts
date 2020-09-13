// #region imports
    // #region external
    import generateTrigger from '../generateTrigger';

    import {
        readConfigurationFile,
        resolveFilepath,
        parseFile,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const registerProviders = async (
    providers: any[],
) => {
    if (!providers) {
        return;
    }

    for (const provider of providers) {
        console.log(provider);
    }
}

const registerImagenes = async (
    imagenes: any[],
) => {
    if (!imagenes) {
        return;
    }

    for (const imagene of imagenes) {
        console.log(imagene);
    }
}

const registerNotifiers = async (
    notifiers: any[],
) => {
    if (!notifiers) {
        return;
    }

    for (const notifier of notifiers) {
        console.log(notifier);
    }
}

const registerRepositories = async (
    repositories: any[],
) => {
    if (!repositories) {
        return;
    }

    for (const repository of repositories) {
        console.log(repository);
    }
}

const registerWebhooks = async (
    webhooks: any[],
) => {
    if (!webhooks) {
        return;
    }

    for (const webhook of webhooks) {
        console.log(webhook);
    }
}

const registerProjects = async (
    projects: any[],
) => {
    if (!projects) {
        return;
    }

    for (const project of projects) {
        console.log(project);
    }
}

const registerSecrets = async (
    secrets: any[],
) => {
    if (!secrets) {
        return;
    }

    for (const secret of secrets) {
        console.log(secret);
    }
}

const registerTriggers = async (
    triggers: any[],
) => {
    if (!triggers) {
        return;
    }

    for (const trigger of triggers) {
        const {
            id,
            name,
            project,
            repository,
            branch,
            path,
            file,
        } = trigger;

        if (
            !name
            || !project
            || !repository
            || !branch
            || !path
            || !file
        ) {
            continue;
        }

        await generateTrigger(
            id,
            name,
            project,
            repository,
            branch,
            path,
            file,
        );
    }
}

const registerDeployers = async (
    deployers: any[],
) => {
    if (!deployers) {
        return;
    }

    for (const deployer of deployers) {
        console.log(deployer);
    }
}


const registerFile = async (
    file: string,
) => {
    const filepath = resolveFilepath(file);

    const data = await parseFile(filepath);

    await registerProviders(data.providers);
    await registerImagenes(data.imagenes);
    await registerNotifiers(data.motifiers);
    await registerRepositories(data.repositories);
    await registerWebhooks(data.webhooks);
    await registerProjects(data.projects);
    await registerSecrets(data.secrets);
    await registerTriggers(data.triggers);
    await registerDeployers(data.deployers);
}


const register = async (
    files: string[],
) => {
    const ownerData = await readConfigurationFile();

    if (!ownerData.server) {
        console.log(`Not logged into a performer server.`);
        return;
    }

    for (const file of files) {
        await registerFile(file);
    }
}
// #endregion module



// #region exports
export default register;
// #endregion exports
