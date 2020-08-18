// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const getDeployers = async (
    context: Context,
) => {
    const {
        deployers,
    } = context;

    return {
        status: true,
        data: [
            ...deployers,
        ],
    };
}
// #endregion module



// #region exports
export default getDeployers;
// #endregion exports
