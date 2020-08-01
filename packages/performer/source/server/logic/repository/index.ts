import {
    promises as fs,
} from 'fs';

import path from 'path';

import {
    execSync,
} from 'child_process';

import {
    Repository,
} from '#server/data/interfaces';

import {
    repositoriesPath,
    repositoriesMetadataPath,
} from '#server/data/constants';

import {
    loadRepositories,
} from '#server/logic/loader';

import {
    cleanFileName,
} from '#server/utilities';



export const registerRepositoryMetadata = async (
    repository: Repository,
) => {
    const {
        id,
        name,
    } = repository;

    const filename = cleanFileName(
        id + '_' + name,
    );

    const repositoryFilePath = path.join(
        repositoriesMetadataPath,
        filename + '.json',
    );

    await fs.writeFile(
        repositoryFilePath,
        JSON.stringify(repository, null, 4),
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



export const updateRootRepository = (
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
