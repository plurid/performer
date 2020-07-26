import {
    Context,
} from '#server/data/interfaces';



const initialSetup = async (
    input: any,
    context: Context,
) => {
    return {
        status: true,
    };
}


export default initialSetup;
