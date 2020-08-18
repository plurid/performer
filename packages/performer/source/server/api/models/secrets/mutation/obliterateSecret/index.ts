// #region imports
    // #region libraries
    import fs from 'fs';

    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        secretsPath,
    } from '#server/data/constants';

    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const deregisterSecret = async (
    id: string,
) => {
    try {
        const secretPath = path.join(
            secretsPath,
            id + '.json',
        );

        if (!fs.existsSync(secretPath)) {
            return;
        }

        fs.promises.unlink(secretPath);
    } catch (error) {
        return;
    }
}


const obliterateSecret = async (
    input: any,
    context: Context,
) => {
    const {
        value,
    } = input;

    deregisterSecret(value);

    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default obliterateSecret;
// #endregion exports
