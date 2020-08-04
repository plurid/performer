import {
    Context,
} from '#server/data/interfaces';



const obliterateSecret = async (
    input: any,
    context: Context,
) => {
    return {
        status: true,
    };
}


export default obliterateSecret;
