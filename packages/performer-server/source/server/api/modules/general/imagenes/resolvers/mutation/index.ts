// #region imports
    // #region external
    import {
        Context,
        InputOf,
        InputAddImagene,
        InputValueString,
    } from '~server/data/interfaces';

    import {
        Imagenes,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    addImagene: (
        _: any,
        { input }: InputOf<InputAddImagene>,
        context: Context,
    ) => Imagenes.Mutation.addImagene(
        input,
        context,
    ),
    obliterateImagene: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Imagenes.Mutation.obliterateImagene(
        input,
        context,
    ),
};
// #endregion exports
