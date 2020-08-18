// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const clearBuilds = async (
    context: Context,
) => {
    const {
        privateUsage,
        privateOwnerIdentonym,
    } = context;

    if (privateUsage && !privateOwnerIdentonym) {
        return {
            status: false,
        };
    }


    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default clearBuilds;
// #endregion exports
