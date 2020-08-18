// #region imports
    // #region libraries
    import fs from 'fs';

    import ncp from 'ncp';
    // #endregion libraries
// #endregion imports



// #region module
/**
 * Given a directory path, makes the directory and all the subdirectories required.
 *
 * @param directory
 */
export const makeDirectorySync = (
    directory: string,
) => {
    fs.mkdirSync(directory, {
        recursive: true,
    });
}


/**
 * Copy a directory and all its contents from `source` to `destination`.
 *
 * @param source
 * @param destination
 */
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
