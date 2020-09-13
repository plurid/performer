// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Notifier,
        InputSetupNotifier,
        InputUpdateNotifier,
        InputValueString,
    } from '#server/data/interfaces';

    import database from '#server/services/database';
    // #endregion external
// #endregion imports



// #region module
const registerNotifier = async (
    input: InputSetupNotifier,
): Promise<any> => {
    // const {
    //     name,
    //     version,
    // } = input;

    // const id = uuid.generate();

    // const notifier: Notifier = {
    //     id,
    //     name,
    //     version,
    //     size: 0,
    // };

    // await database.store(
    //     'notifier',
    //     id,
    //     notifier,
    // );

    // return notifier;
    return;
}


const updateNotifier = async (
    input: InputUpdateNotifier,
): Promise<any> => {
    return;
}


const deregisterNotifier = async (
    input: InputValueString,
) => {
    await database.obliterate(
        'notifier',
        input.value,
    );
}
// #endregion module



// #region exports
export {
    registerNotifier,
    updateNotifier,
    deregisterNotifier,
};
// #endregion exports
