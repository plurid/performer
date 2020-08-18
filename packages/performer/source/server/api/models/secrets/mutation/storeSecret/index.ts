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
        secretsPath,
    } from '#server/data/constants';

    import {
        SecretStored,
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const registerSecret = async (
    secret: SecretStored,
) => {
    const {
        id,
    } = secret;

    const secretPath = path.join(
        secretsPath,
        id + '.json',
    );

    await fs.writeFile(
        secretPath,
        JSON.stringify(secret, null, 4),
    );
}


const storeSecret = async (
    input: any,
    context: Context,
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
    registerSecret(secretStored);

    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default storeSecret;
// #endregion exports
