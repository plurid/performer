import {
    Context,
} from '#server/data/interfaces';

import {
    Imagenes,
} from '#server/api/models';



export default {
    addImagene: (
        _: any,
        { input }: any,
        context: Context,
    ) => Imagenes.Mutation.addImagene(
        input,
    ),
    obliterateImagene: (
        _: any,
        { input }: any,
        context: Context,
    ) => Imagenes.Mutation.obliterateImagene(
        input,
        context,
    ),
};
