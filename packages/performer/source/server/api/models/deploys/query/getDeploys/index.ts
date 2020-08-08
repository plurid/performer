import {
    Context,
} from '#server/data/interfaces';



const getDeploys = (
    context: Context,
) => {
    const {
        deploys,
    } = context;

    return {
        status: true,
        data: deploys,
    };
}


export default getDeploys;
