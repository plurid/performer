// #region imports
    // #region external
    import {
        Context,
        InputValueString,
    } from '#server/data/interfaces';

    import {
        deregisterRepository,
    } from '#server/logic/repository';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const delinkRepositoryLogs = generateMethodLogs('delinkRepository');


const delinkRepository = async (
    input: InputValueString,
    context: Context,
) => {
    const {
        value: id,
    } = input;

    await deregisterRepository(id);

    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default delinkRepository;
// #endregion exports
