// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        getBuildLogs as getBuildLogsLogic,
    } from '#server/logic/build';
    // #endregion external
// #endregion imports



// #region module
const getBuildLogs = async (
    input: any,
    context: Context,
) => {
    const {
        builds,
        privateUsage,
        privateOwnerIdentonym,
    } = context;

    if (privateUsage && !privateOwnerIdentonym) {
        return {
            status: false,
        };
    }


    const {
        value,
    } = input;

    const build = builds.find(build => build.id === value);

    if (!build) {
        return {
            status: false,
        };
    }

    const {
        stages,
    } = build;

    const results = await getBuildLogsLogic(
        value,
        stages,
    );

    return {
        status: true,
        data: {
            build,
            results,
        },
    };
}
// #endregion module



// #region exports
export default getBuildLogs;
// #endregion exports
