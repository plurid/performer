import {
    promises as fs,
} from 'fs';

import path from 'path';

import {
    Repository,
} from '#server/data/interfaces';

import {
    repositoriesMetadataPath,
} from '#server/data/constants';

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
