// #region imports
    // #region libraries
    import fs from 'fs';

    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        deployersPath,
    } from '#server/data/constants';

    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const deregisterDeployer = async (
    id: string,
) => {
    try {
        const deployerPath = path.join(
            deployersPath,
            id + '.json',
        );

        if (!fs.existsSync(deployerPath)) {
            return;
        }

        fs.promises.unlink(deployerPath);
    } catch (error) {
        return;
    }
}


const obliterateDeployer = async (
    input: any,
    context: Context,
) => {
    const {
        value
    } = input;

    await deregisterDeployer(value);

    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default obliterateDeployer;
// #endregion exports
