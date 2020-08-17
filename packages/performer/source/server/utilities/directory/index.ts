// #region imports
    // #region libraries
    import fs from 'fs';

    import ncp from 'ncp';
    // #endregion libraries
// #endregion imports



// #region module
export const makeDirectorySync = (
    directory: string,
) => {
    fs.mkdirSync(directory, {
        recursive: true,
    });
}


export const copyDirectory = async (
    source: string,
    destination: string,
) => {
    return new Promise((resolve, reject) => {
        ncp(source, destination, (error) => {
            if (error) {
                reject(0);
            }

            resolve();
        });
    });
}
// #endregion module
