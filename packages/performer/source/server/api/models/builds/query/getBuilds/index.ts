import {
    Context,
} from '#server/data/interfaces';



const getBuilds = (
    context: Context,
) => {
    const {
        builds,
    } = context;

    return {
        status: true,
        data: builds,
    };
}


export default getBuilds;
