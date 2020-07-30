import {
    Context,
} from '#server/data/interfaces';



const clearBuilds = async (
    context: Context,
) => {
    return {
        status: true,
    };
}


export default clearBuilds;
