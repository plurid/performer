// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
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
// #endregion module



// #region exports
export default getDeploys;
// #endregion exports
