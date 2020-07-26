import {
    Context,
} from '#server/data/interfaces';



const getSecret = async (
    input: any,
    context: Context,
) => {
    return {
        status: true,
    };
}


export default getSecret;
