// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Imagene,
        InputAddImagene,
    } from '#server/data/interfaces';

    import database from '#server/services/database';
    // #endregion external
// #endregion imports



// #region module
const registerImagene = async (
    input: InputAddImagene,
) => {
    const {
        name,
        version,
    } = input;

    const id = uuid.generate();

    const imagene: Imagene = {
        id,
        name,
        version,
        size: 0,
    };

    await database.store(
        'imagene',
        id,
        imagene,
    );

    return imagene;
}


const deregisterImagene = async (
    id: string,
) => {
    await database.obliterate(
        'imagene',
        id,
    );
}
// #endregion module



// #region exports
export {
    registerImagene,
    deregisterImagene,
};
// #endregion exports
