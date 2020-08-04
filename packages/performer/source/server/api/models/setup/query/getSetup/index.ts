import {
    Context,
} from '#server/data/interfaces';



const getSetup = async (
    context: Context,
) => {
    const {
        providers,
        imagenes,
        webhooks,
        repositories,
        projects,
        secrets,
        triggers,
        builds,
    } = context;

    return {
        status: true,
        data: {
            providers,
            imagenes,
            webhooks,
            repositories,
            projects,
            secrets,
            triggers,
            builds,
        },
    };
}


export default getSetup;
