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
        InputValueString,
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
    input: InputValueString,
) => {
    await database.obliterate(
        'imagene',
        input.value,
    );
}
// #endregion module



// #region exports
export {
    registerImagene,
    deregisterImagene,
};
// #endregion exports
