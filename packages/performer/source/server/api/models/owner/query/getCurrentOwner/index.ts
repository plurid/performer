// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const getCurrentOwner = async (
    context: Context,
) => {
    try {
        const {
            request,
            privateOwnerIdentonym,
        } = context;

        const logic = request.performerLogic;

        if (logic) {
            const owner = await logic.getCurrentOwner();

            return {
                status: true,
                data: owner,
            };
        }

        if (privateOwnerIdentonym) {
            return {
                status: true,
                data: {
                    id: privateOwnerIdentonym,
                },
            };
        }

        return {
            status: false,
        };
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default getCurrentOwner;
// #endregion exports
