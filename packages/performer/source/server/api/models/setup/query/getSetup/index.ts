import {
    Context,
} from '#server/data/interfaces';



const getSetup = async (
    context: Context,
) => {
    const {
        webhooks,
        triggers,
        repositories,
        builds,
        providers,
        imagenes,
    } = context;

    return {
        status: true,
        data: {
            webhooks: [
                ...webhooks,
            ],
            triggers: [
                ...triggers,
            ],
            repositories: [
                ...repositories,
            ],
            builds: [
                ...builds,
            ],
            providers: [
                ...providers,
            ],
            imagenes: [
                ...imagenes,
            ],
        },
    };
}


export default getSetup;
