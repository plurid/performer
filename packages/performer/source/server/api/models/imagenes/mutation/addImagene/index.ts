// #region imports
    // #region external
    import {
        Context,
        InputAddImagene,
    } from '#server/data/interfaces';

    import {
        registerImagene,
    } from '#server/logic/imagene';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const addImageneLogs = generateMethodLogs('addImagene');

const addImagene = async (
    input: InputAddImagene,
    context: Context,
) => {
    await registerImagene(input);

    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default addImagene;
// #endregion exports
