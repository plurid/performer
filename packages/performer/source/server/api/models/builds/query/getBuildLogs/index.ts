import {
    Context,
} from '#server/data/interfaces';

import {
    getBuildLogs as getBuildLogsLogic,
} from '#server/logic/build';



const getBuildLogs = async (
    input: any,
    context: Context,
) => {
    const {
        value,
    } = input;

    const {
        builds,
    } = context;

    const build = builds.find(build => build.id === value);

    if (!build) {
        return {
            status: false,
        };
    }

    const {
        stages,
    } = build;

    const results = getBuildLogsLogic(
        value,
        stages,
    );

    return {
        status: true,
        data: results,
    };
}


export default getBuildLogs;
