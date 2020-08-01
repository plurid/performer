import fs from 'fs';
import path from 'path';
import {
    exec,
} from 'child_process';

import {
    BASE_PATH_REPOSITORIES,
} from '#server/data/constants';

import {
    Provider,
    Repository,
} from '#server/data/interfaces';

import {
    requester,
} from '../requester';

import {
    VIEWER_LOGIN,
    QUERY_REPOSITORIES,
    QUERY_REPOSITORY_BY_NAME_OWNER,
} from '../query';



export const getOwner = async (
    provider: Provider,
) => {
    const client = requester(provider.token);

    const query = await client.query({
        query: VIEWER_LOGIN,
    });

    const {
        data,
    } = query;

    if (!data) {
        return;
    }

    const {
        login,
    } = data.viewer;

    return {
        identonym: login,
    };
}


export const downloadRepository = async (
    token: string,
    name: string,
    repositoryPath: string,
) => {
    const gitCloneCommand = `git clone https://${token}@github.com/${name}.git ./root`;

    return new Promise((resolve, reject) => {
        exec(gitCloneCommand, {
            cwd: repositoryPath,
        }, (error) => {
            if (error) {
                reject(0);
            }

            resolve();
        });
    });
}


export const getRepository = async (
    token: string,
    name: string,
) => {
    const repositoryPath = BASE_PATH_REPOSITORIES + 'github/' + name;
    const resolvedRepositoryPath = path.join(process.cwd(), repositoryPath);

    try {
        fs.mkdirSync(repositoryPath, {
            recursive: true,
        });
    } catch (error) {
        return;
    }

    await downloadRepository(
        token,
        name,
        resolvedRepositoryPath,
    );
}


export const getRepositoriesData = async (
    provider: Provider,
) => {
    try {
        const client = requester(provider.token);

        const query = await client.query({
            query: QUERY_REPOSITORIES,
        });

        const {
            data,
        } = query;

        if (!data) {
            return;
        }

        const repositoriesData = data.viewer.repositories.nodes;

        const repositories: Repository[] = repositoriesData.map(
            (providerRepository: any) => {
                const {
                    nameWithOwner,
                    databaseId,
                    isPrivate,
                } = providerRepository;

                const repository: Repository = {
                    id: databaseId,
                    name: nameWithOwner,
                    isPrivate,
                };

                return repository;
            }
        );

        return repositories;
    } catch (error) {
        return;
    }
}


export const getRepositoryDataByNameWithOwner = async (
    provider: Provider,
    nameWithOwner: string,
) => {
    try {
        const client = requester(provider.token);

        const split = nameWithOwner.split('/');
        const owner = split[0];
        const name = split[1];

        const query = await client.query({
            query: QUERY_REPOSITORY_BY_NAME_OWNER,
            variables: {
                name,
                owner,
            },
        });

        const {
            data,
        } = query;

        if (!data) {
            return;
        }

        const {
            defaultBranchRef,
        } = data.repository;
        const url = defaultBranchRef.target.zipballUrl;

        const repositoryData: Repository = {
            id: data.repository.databaseId,
            isPrivate: data.repository.isPrivate,
            name: data.repository.nameWithOwner,
            zipURL: url,
        };

        return repositoryData;
    } catch (error) {
        return;
    }
}
