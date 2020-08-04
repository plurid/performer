import {
    Context,
} from '#server/data/interfaces';



const storeSecret = async (
    input: any,
    context: Context,
) => {
    return {
        status: true,
    };
}


export default storeSecret;
