// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Provider,
        InputAddProvider,
    } from '#server/data/interfaces';

    import database from '#server/services/database';
    // #endregion external
// #endregion imports



// #region module
const registerProvider = async (
    input: InputAddProvider,
) => {
    const {
        type,
        token,
        name,
    } = input;

    const id = uuid.generate();

    const provider: Provider = {
        id,
        type,
        token,
        name,
    };

    await database.store(
        'provider',
        id,
        provider,
    );

    return provider;
}
// #endregion module



// #region exports
export {
    registerProvider,
};
// #endregion exports
