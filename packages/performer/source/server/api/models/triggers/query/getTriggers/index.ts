import {
    Context,
} from '#server/data/interfaces';



const getTriggers = async (
    context: Context,
) => {
    const {
        triggers,
    } = context;

    return {
        status: true,
        data: [
            ...triggers,
        ],
    };
}


export default getTriggers;
