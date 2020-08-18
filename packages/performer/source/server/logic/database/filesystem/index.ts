// #region imports
    // #region libraries
    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        Database,
        DatabaseGet,
        DatabaseQuery,
        DatabaseStore,
        DatabaseUpdate,
        DatabaseObliterate,
    } from '#server/data/interfaces';

    import {
        providersPath,
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
    query,
    store,
    update,
    obliterate,
};
// #endregion module



// #region exports
export default filesystemDatabase;
// #endregion exports
