import {
    Context,
} from '#server/data/interfaces';

import {
    getDeployLogs as getDeployLogsLogic,
} from '#server/logic/deploy';



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


export default getDeployLogs;
