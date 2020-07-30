import {
    Context,
} from '#server/data/interfaces';



const getImagenes = async (
    context: Context,
) => {
    const {
        imagenes,
    } = context;

    return {
        status: true,
        data: [
            ...imagenes,
        ],
    };
}


export default getImagenes;
