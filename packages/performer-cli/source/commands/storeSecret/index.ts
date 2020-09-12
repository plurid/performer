// #region imports
    // #region libraries
    import {
        STORE_SECRET,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        getPerformer,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const storeSecret = async (
    name: string,
    value: string,
    project: string,
) => {
    try {
        const performer = await getPerformer();

        if (!performer) {
            console.log('Could not store secret. Not logged in.');
            return;
        }

        const input = {
            name,
            value,
            project,
        };

        const mutation = await performer.mutate({
            mutation: STORE_SECRET,
            variables: {
                input,
            },
        });

        const response = mutation.data.storeSecret;

        if (!response.status) {
            console.log('Could not store secret. Something went wrong.');
            return;
        }

        console.log(`Secret '${name}' stored.`);

        return;
    } catch (error) {
        console.log('Could not store secret. Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default storeSecret;
// #endregion exports
