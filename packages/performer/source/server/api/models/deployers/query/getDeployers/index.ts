import {
    Context,
} from '#server/data/interfaces';



const getDeployers = async (
    context: Context,
) => {
    const {
        deployers,
    } = context;

    return {
        status: true,
        data: [
            ...deployers,
        ],
    };
}


export default getDeployers;
