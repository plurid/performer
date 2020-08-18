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
        deployers,
        builds,
        deploys,
        privateUsage,
        privateOwnerIdentonym,
    } = context;


    if (privateUsage) {
        if (!privateOwnerIdentonym) {
            return {
                status: false,
            };
        }

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
                deployers,
                builds,
                deploys,
            },
        };
    }


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
            deployers,
            builds,
            deploys,
        },
    };
}


export default getSetup;
