// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        PRIVATE_USAGE,
    } from '#server/data/constants';
    // #endregion external
// #endregion imports



// #region module
const getUsageType = async (
    context: Context,
) => {
    try {
        const {
            request,
        } = context;

        if (request.performerLogic) {
            return {
                status: true,
                data: 'CUSTOM_LOGIC',
            };
        }

        if (PRIVATE_USAGE) {
            return {
                status: true,
                data: 'PRIVATE_USAGE'
            };
        }

        return {
            status: true,
            data: 'PUBLIC',
        };
    } catch (error) {
        return {
            status: true,
            data: 'PUBLIC',
        };
    }
}
// #endregion module



// #region exports
export default getUsageType;
// #endregion exports
