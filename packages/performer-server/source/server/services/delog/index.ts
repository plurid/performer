// #region imports
    // #region libraries
    import delog, {
        DelogData,
    } from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        USE_DELOG,
    } from '#server/data/constants';
    // #endregion external
// #endregion imports



// #region module
const metaDelog = (
    data: DelogData,
) => {
    if (!USE_DELOG) {
        return;
    }

    delog(data);
}
// #endregion module



// #region exports
export default metaDelog;
// #endregion exports
