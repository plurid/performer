import {
    Context,
} from '#server/data/interfaces';



const getRepositories = (
    context: Context,
) => {
    const {
        repositories,
    } = context;

    return {
        status: true,
        data: repositories,
    };
}


export default getRepositories;
