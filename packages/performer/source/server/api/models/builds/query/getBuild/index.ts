import {
    Context,
} from '#server/data/interfaces';



const getBuild = async (
    input: any,
    context: Context,
) => {
    const {
        builds,
    } = context;

    const {
        id,
    } = input;

    const build = builds.find(build => build.id === id);

    if (!build) {
        return {
            status: false,
        };
    }

    return {
        status: true,
        data: build,
    };
}


export default getBuild;
