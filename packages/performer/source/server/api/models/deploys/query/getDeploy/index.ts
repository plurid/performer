import {
    Context,
} from '#server/data/interfaces';



const getDeploy = async (
    input: any,
    context: Context,
) => {
    const {
        deploys,
    } = context;

    const {
        id,
    } = input;

    const deploy = deploys.find(deploy => deploy.id === id);

    if (!deploy) {
        return {
            status: false,
        };
    }

    return {
        status: true,
        data: deploy,
    };
}


export default getDeploy;
