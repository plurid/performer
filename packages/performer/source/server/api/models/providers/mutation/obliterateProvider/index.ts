// #region imports
    // #region libraries
    import fs from 'fs';

    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        providersPath,
    } from '#server/data/constants';
    // #endregion external
// #endregion imports



// #region module
export const deregisterProvider = async (
    id: string,
) => {
    try {
        const providerPath = path.join(
            providersPath,
            id + '.json',
        );

        if (!fs.existsSync(providerPath)) {
            return;
        }

        fs.promises.unlink(providerPath);
    } catch (error) {
        return;
    }
}


const obliterateProvider = async (
    input: any,
    context: Context,
) => {
    const {
        value,
    } = input;

    deregisterProvider(value);

    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default obliterateProvider;
// #endregion exports
