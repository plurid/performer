// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import path from 'path';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        SecretStored,
        InputStoreSecret,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const registerSecret = async (
    input: InputStoreSecret,
) => {
    const {
        name,
        value,
        project,
    } = input;

    const id = uuid.generate();
    const secretStored: SecretStored = {
        id,
        name,
        value,
        project,
    };

    // const secretPath = path.join(
    //     secretsPath,
    //     id + '.json',
    // );

    // await fs.writeFile(
    //     secretPath,
    //     JSON.stringify(secretStored, null, 4),
    // );
}


const deregisterSecret = async (
    id: string,
) => {
    try {
        // const secretPath = path.join(
        //     secretsPath,
        //     id + '.json',
        // );

        // if (!fs.existsSync(secretPath)) {
        //     return;
        // }

        // fs.promises.unlink(secretPath);
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export {
    registerSecret,
    deregisterSecret,
};
// #endregion exports
