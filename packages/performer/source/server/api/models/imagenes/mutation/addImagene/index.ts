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
        imagenesPath,
    } from '#server/data/constants';

    import {
        Imagene,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const registerImagene = async (
    imagene: Imagene,
) => {
    const {
        id,
    } = imagene;

    const imagenePath = path.join(
        imagenesPath,
        id + '.json',
    );

    await fs.writeFile(
        imagenePath,
        JSON.stringify(imagene, null, 4),
    );
}


const addImagene = async (
    input: any,
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

    await registerImagene(imagene);

    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default addImagene;
// #endregion exports
