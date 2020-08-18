// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const getBuild = async (
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
// #endregion module



// #region exports
export default getBuild;
// #endregion exports
