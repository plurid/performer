// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        PRIVATE_USAGE,
    } from '#server/data/constants';

    import {
        getPrivateOwner,
    } from '#server/logic/privateUsage';
    // #endregion external
// #endregion imports



// #region module
const getCurrentOwner = async (
    context: Context,
) => {
    try {
        const {
            request,
        } = context;

        const logic = request.performerLogic;

        if (logic) {
            const owner = await logic.getCurrentOwner();

            return {
                status: true,
                data: owner,
            };
        }

        if (PRIVATE_USAGE) {
            const privateOwnerIdentonym = getPrivateOwner(request);

            if (!privateOwnerIdentonym) {
                return {
                    status: false,
                };
            }

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
