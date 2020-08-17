// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        QUIET,
    } from '#server/data/constants';

    import {
        Storage,
        StorageDownload,
        StorageDownloadAll,
        StorageUpload,
        StorageObliterate,
        StorageGenerateLocations,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const storageDownload: StorageDownload = async (
    filename,
) => {
    try {
        return '';
    } catch (error) {
        if (!QUIET) {
            console.log(`[Performer Error 500] :: Filesystem could not download ${filename}.`);
        }

        return;
    }
}


const storageDownloadAll: StorageDownloadAll = async (
    directory,
) => {
    try {
        return [];
    } catch (error) {
        if (!QUIET) {
            console.log(`[Performer Error 500] :: Filesystem could not download ${directory}.`);
        }

        return;
    }
}


const storageUpload: StorageUpload = async (
    filename,
    data,
    kind?,
) => {
    try {
        return;
    } catch (error) {
        if (!QUIET) {
            console.log(`[Performer Error 500] :: Filesystem could not upload ${filename}.`);
        }

        return;
    }
}


const storageObliterate: StorageObliterate = async (
    filename,
) => {
    try {
        return true;
    } catch (error) {
        if (!QUIET) {
            console.log(`[Performer Error 500] :: Filesystem could not obliterate ${filename}.`);
        }

        return;
    }
}


const storageGenerateLocations: StorageGenerateLocations = async () => {
    try {
        return true;
    } catch (error) {
        if (!QUIET) {
            console.log('[Performer Error 500] :: Filesystem could not generate locations.');
        }

        return;
    }
}



const filesystemStorage: Storage = {
    download: storageDownload,
    downloadAll: storageDownloadAll,
    upload: storageUpload,
    obliterate: storageObliterate,
    generateLocations: storageGenerateLocations,
};
// #endregion module



// #region exports
export default filesystemStorage;
// #endregion exports
