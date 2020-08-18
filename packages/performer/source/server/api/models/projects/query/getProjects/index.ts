// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const getProjects = async (
    context: Context,
) => {
    const {
        projects,
    } = context;

    return {
        status: true,
        data: [
            ...projects,
        ],
    };
}
// #endregion module



// #region exports
export default getProjects;
// #endregion exports
