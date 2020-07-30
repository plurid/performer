import {
    Context,
} from '#server/data/interfaces';

import {
    Imagenes,
} from '#server/api/models';



export default {
    getImagenes: (
        _: any,
        __: any,
        context: Context,
    ) => Imagenes.Query.getImagenes(
        context,
    ),
};
