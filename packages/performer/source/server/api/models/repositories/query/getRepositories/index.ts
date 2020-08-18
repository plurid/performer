// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const getRepositories = (
    context: Context,
) => {
    const {
        repositories,
    } = context;

    return {
        status: true,
        data: repositories,
    };
}
// #endregion module



// #region exports
export default getRepositories;
// #endregion exports
