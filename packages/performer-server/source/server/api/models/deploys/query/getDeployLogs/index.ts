// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        getDeployLogs as getDeployLogsLogic,
    } from '~server/logic/deploy';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const getDeployLogsLogs = generateMethodLogs('getDeployLogs');


const getDeployLogs = async (
    input: any,
    context: Context,
) => {
    const {
        value,
    } = input;

    const {
        deploys,
    } = context;

    const deploy = deploys.find(deploy => deploy.id === value);

    if (!deploy) {
        return {
            status: false,
        };
    }

    const {
        stages,
    } = deploy;

    const results = await getDeployLogsLogic(
        value,
        stages,
    );

    return {
        status: true,
        data: {
            deploy,
            results,
        },
    };
}
// #endregion module



// #region exports
export default getDeployLogs;
// #endregion exports
