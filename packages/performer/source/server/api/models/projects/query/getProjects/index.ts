import {
    Context,
} from '#server/data/interfaces';



const getProjects = async (
    context: Context,
) => {
    const {
        projects,
    } = context;

    return {
        status: true,
        data: [
            ...projects,
        ],
    };
}


export default getProjects;
