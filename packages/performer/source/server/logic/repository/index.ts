// #region imports
    // #region libraries
    import path from 'path';

    import {
        execSync,
    } from 'child_process';
    // #endregion libraries


    // #region external
    import {
        Repository,
    } from '#server/data/interfaces';

    import {
        repositoriesPath,
    } from '#server/data/constants';

    import {
        loadRepositories,
    } from '#server/logic/loader';

    import database from '#server/services/database';
    // #endregion external
// #endregion imports



// #region module
export const registerRepositoryMetadata = async (
    repository: Repository,
) => {
    const {
        id,
    } = repository;

    await database.store(
        'repository',
        id,
        repository,
    );
}


export const deregisterRepository = async (
    id: string,
) => {
    await database.obliterate(
        'repository',
        id,
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


export const updateRootRepository = async (
    repositoryName: string,
) => {
    const repositoryPath = path.join(
        repositoriesPath,
        './github/' + repositoryName,
    );
    const repositoryRootPath = path.join(
        repositoryPath,
        '/root',
    );

    const gitCommandFetchOrigin = 'git fetch origin';
    const gitCommandPull = 'git pull';

    execSync(gitCommandFetchOrigin, {
        cwd: repositoryRootPath,
        stdio: 'ignore',
    });

    execSync(gitCommandPull, {
        cwd: repositoryRootPath,
        stdio: 'ignore',
    });
}
// #endregion module
