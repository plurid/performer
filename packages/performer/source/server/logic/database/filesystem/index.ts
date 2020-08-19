// #region imports
    // #region libraries
    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        Database,
        DatabaseGet,
        DatabaseGetAll,
        DatabaseQuery,
        DatabaseStore,
        DatabaseUpdate,
        DatabaseObliterate,
    } from '#server/data/interfaces';

    import {
        providersPath,
    } from '#server/data/constants';

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

    import filesystemStorage from '#server/logic/storage/filesystem';
    // #endregion external
// #endregion imports



// #region module
const get: DatabaseGet = async (
    entity,
    id,
) => {
    return;
}


const getAll: DatabaseGetAll = async (
    entity,
) => {
    switch (entity) {
        case 'providers':
            return await filesystemStorage.downloadAll(BASE_PATH_PROVIDERS);
        case 'imagenes':
            return await filesystemStorage.downloadAll(BASE_PATH_IMAGENES);
        case 'repositories':
            return await filesystemStorage.downloadAll(BASE_PATH_REPOSITORIES_METADATA);
        case 'webhooks':
            return await filesystemStorage.downloadAll(BASE_PATH_WEBHOOKS);
        case 'projects':
            return await filesystemStorage.downloadAll(BASE_PATH_PROJECTS);
        case 'secrets':
            return await filesystemStorage.downloadAll(BASE_PATH_SECRETS);
        case 'triggers':
            return await filesystemStorage.downloadAll(BASE_PATH_TRIGGERS);
        case 'deployers':
            return await filesystemStorage.downloadAll(BASE_PATH_DEPLOYERS);
        case 'builds':
            return await filesystemStorage.downloadAll(BASE_PATH_BUILDS);
        case 'buildsQueue':
            return await filesystemStorage.downloadAll(BASE_PATH_BUILD_QUEUE);
        case 'deploys':
            return await filesystemStorage.downloadAll(BASE_PATH_DEPLOYS);
        default:
            return [];
    }
}


const query: DatabaseQuery = async (
    entity,
    field,
    value,
) => {
    return;
}


const store: DatabaseStore = async (
    entity,
    id,
    data,
) => {
    const stringData = JSON.stringify(data, null, 4);

    let dataPath = '';

    switch (entity) {
        case 'provider':
            dataPath = providersPath;
            break;
    }

    const entityPath = path.join(
        dataPath,
        id + '.json',
    );

    filesystemStorage.upload(
        entityPath,
        Buffer.from(stringData, 'utf-8'),
    );

    return;
}


const update: DatabaseUpdate = async (
    entity,
    id,
    field,
    value,
) => {
    return;
}


const obliterate: DatabaseObliterate = async (
    entity,
    id,
) => {
    return;
}


const filesystemDatabase: Database = {
    get,
    getAll,
    query,
    store,
    update,
    obliterate,
};
// #endregion module



// #region exports
export default filesystemDatabase;
// #endregion exports
