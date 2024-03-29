// #region imports
    // #region libraries
    // import { S3Client } from '@aws-sdk/client-s3';
    // #endregion libraries


    // #region external
    import {
        QUIET,
    } from '~server/data/constants';

    import {
        Storage,
        StorageDownload,
        StorageDownloadAll,
        StorageUpload,
        StorageObliterate,
        StorageObliterateAll,
        StorageGenerateLocations,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const apiVersion = process.env.HYPOD_AWS_API_VERSION || '';
const region = process.env.HYPOD_AWS_REGION || '';
const accessKeyId = process.env.HYPOD_AWS_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.HYPOD_AWS_SECRET_ACCESS_KEY || '';
const bucketName = process.env.HYPOD_STORAGE_BUCKET || '';

// const s3 = new S3Client({
//     apiVersion,
//     region,
//     // accessKeyId,
//     // secretAccessKey,
// });


const storageDownload: StorageDownload = async (
    filename,
) => {
    try {
        return '';
    } catch (error) {
        if (!QUIET) {
            console.log(`[Performer Error 500] :: Amazon could not download ${filename}.`);
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

        return [];
    }
}


const storageUpload: StorageUpload = async (
    filename,
    data,
    kind?,
) => {
    try {
        return true;
    } catch (error) {
        if (!QUIET) {
            console.log(`[Performer Error 500] :: Amazon could not upload ${filename}.`);
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
            console.log(`[Performer Error 500] :: Amazon could not obliterate ${filename}.`);
        }

        return;
    }
}


const storageObliterateAll: StorageObliterateAll = async (
    pathway,
) => {
    try {
        return true;
    } catch (error) {
        if (!QUIET) {
            console.log(`[Performer Error 500] :: Amazon could not obliterate all ${pathway}.`);
        }

        return;
    }
}


const storageGenerateLocations: StorageGenerateLocations = async () => {
    try {
        return true;
    } catch (error) {
        if (!QUIET) {
            console.log('[Performer Error 500] :: Amazon could not generate locations.');
        }

        return;
    }
}



const amazonStorage: Storage = {
    download: storageDownload,
    downloadAll: storageDownloadAll,
    upload: storageUpload,
    obliterate: storageObliterate,
    obliterateAll: storageObliterateAll,
    generateLocations: storageGenerateLocations,
};
// #endregion module



// #region exports
export default amazonStorage;
// #endregion exports
