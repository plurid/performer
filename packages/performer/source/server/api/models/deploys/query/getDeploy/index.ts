// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const getDeployLogs = generateMethodLogs('getDeploy');


const getDeploy = async (
    input: any,
    context: Context,
) => {
    const {
        deploys,
    } = context;

    const {
        id,
    } = input;

    const deploy = deploys.find(deploy => deploy.id === id);

    if (!deploy) {
        return {
            status: false,
        };
    }

    return {
        status: true,
        data: deploy,
    };
}
// #endregion module



// #region exports
export default getDeploy;
// #endregion exports
