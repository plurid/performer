// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const getDeploysLogs = generateMethodLogs('getDeploys');


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
