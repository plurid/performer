// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const deregisterRepository = async (
    id: string,
) => {
    try {

        // if (!fs.existsSync(repositoryPath)) {
        //     return;
        // }

    } catch (error) {
        return;
    }
}


const delinkRepository = async (
    input: any,
    context: Context,
) => {
    const {
        value,
    } = input;

    await deregisterRepository(value);

    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default delinkRepository;
// #endregion exports
