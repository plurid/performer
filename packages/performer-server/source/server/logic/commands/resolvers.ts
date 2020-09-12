// #region imports
    // #region external
    import {
        loadStoredSecrets,
    } from '#server/logic/loader';
    // #endregion external
// #endregion imports



// #region module
export const resolveImagene = (
    imagene: string,
) => {
    switch (imagene) {
        case 'ubuntu':
            return 'ubuntu:20.04';
        case 'nodejs':
            return 'node:12.18.3';
        case 'docker':
            return 'docker';
        case 'kubectl':
            return 'kubectl';
    }

    return;
}


export const resolveSecrets = async (
    project: string,
    secretsPerformer: string[] | undefined,
    secretsEnvironment: string[] | undefined
) => {
    if (!secretsPerformer || !secretsEnvironment) {
        return [];
    }

    const storedSecrets = await loadStoredSecrets();
    const indexedProjectSecrets: any = {};

    for (const storedSecret of storedSecrets) {
        if (storedSecret.project === project) {
            indexedProjectSecrets[storedSecret.name] = {
                ...storedSecret,
            };
        }
    }

    const secretsValues: string[] = [];

    for (const secretEnvironment of secretsEnvironment) {
        if (secretsPerformer.includes(secretEnvironment)) {
            const secret = indexedProjectSecrets[secretEnvironment];
            if (secret) {
                const secretValue = `${secret.name}=${secret.value}`;
                secretsValues.push(secretValue);
            }
        }
    }

    return secretsValues;
}


export const resolveDockerTag = (
    command: string | string[],
    commitShortSHA: string,
) => {
    const split = typeof command === 'string'
        ? command.split(' ')
        : command.join(' ').split(' ');

    for (const [index, value] of split.entries()) {
        if (value === '-t' || value === '--tag') {
            const tag = split[index + 1] || '';
            const tagShortSha = tag.replace('$SHORT_SHA', commitShortSHA);

            return tagShortSha;
        }

        if (value === 'push') {
            const tag = split[index + 1] || '';
            const tagShortSha = tag.replace('$SHORT_SHA', commitShortSHA);

            return tagShortSha;
        }
    }

    return '';
}


export const resolveDockerFile = (
    command: string | string[],
) => {
    const split = typeof command === 'string'
        ? command.split(' ')
        : command.join(' ').split(' ');

    for (const [index, value] of split.entries()) {
        if (value === '-f' || value === '--file') {
            const dockerfile = split[index + 1] || '';
            return dockerfile;
        }
    }

    return '';
}
// #endregion module
