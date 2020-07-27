import {
    Context,
} from '#server/data/interfaces';



const setupProvider = async (
    input: any,
    context: Context,
) => {
    const {
        token,
        provider,
    } = input;

    console.log('input', input);


    return {
        status: true,
    };
}


export default setupProvider;
