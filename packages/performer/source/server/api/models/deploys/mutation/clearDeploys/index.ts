import {
    Context,
} from '#server/data/interfaces';



const clearDeploys = async (
    context: Context,
) => {
    return {
        status: true,
    };
}


export default clearDeploys;
