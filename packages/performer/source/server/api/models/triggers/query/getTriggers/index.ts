// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const getTriggers = async (
    context: Context,
) => {
    const {
        triggers,
    } = context;

    return {
        status: true,
        data: [
            ...triggers,
        ],
    };
}
// #endregion module



// #region exports
export default getTriggers;
// #endregion exports
