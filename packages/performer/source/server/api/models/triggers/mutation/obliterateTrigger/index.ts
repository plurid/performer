// #region imports
    // #region libraries
    import fs from 'fs';

    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        triggersPath,
    } from '#server/data/constants';

    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const deregisterTrigger = async (
    id: string,
) => {
    try {
        const triggerPath = path.join(
            triggersPath,
            id + '.json',
        );

        if (!fs.existsSync(triggerPath)) {
            return;
        }

        fs.promises.unlink(triggerPath);
    } catch (error) {
        return;
    }
}


const obliterateTrigger = async (
    input: any,
    context: Context,
) => {
    const {
        value
    } = input;

    await deregisterTrigger(value);

    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default obliterateTrigger;
// #endregion exports
