// #region imports
    // #region libraries
    import {
        SETUP_WEBHOOK,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        getPerformer,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const setupWebhook = async (
    path: string,
) => {
    try {
        const performer = await getPerformer();

        if (!performer) {
            console.log('Could not setup webhook. Not logged in.');
            return;
        }

        const input = {
            path,
        };

        const mutation = await performer.mutate({
            mutation: SETUP_WEBHOOK,
            variables: {
                input,
            },
        });

        const response = mutation.data.setupWebhook;

        if (!response.status) {
            console.log('Could not setup webhook. Something went wrong.');
            return;
        }

        console.log(`Webhook setup on path '${path}'.`);

        return;
    } catch (error) {
        console.log('Could not setup webhook. Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default setupWebhook;
// #endregion exports
