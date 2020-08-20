// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        SecretStored,
        InputStoreSecret,
    } from '#server/data/interfaces';

    import database from '#server/services/database';
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

    await database.store(
        'secret',
        id,
        secretStored,
    );
}


const deregisterSecret = async (
    id: string,
) => {
    await database.obliterate(
        'secret',
        id,
    );
}
// #endregion module



// #region exports
export {
    registerSecret,
    deregisterSecret,
};
// #endregion exports
