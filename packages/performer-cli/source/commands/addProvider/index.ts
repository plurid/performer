// #region imports
    // #region libraries
    import {
        ADD_PROVIDER,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        getPerformer,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const addProvider = async (
    type: string,
    name: string,
    token: string,
) => {
    try {
        const performer = await getPerformer();

        if (!performer) {
            console.log('Could not add provider. Not logged in.');
            return;
        }

        const input = {
            type,
            name,
            token,
        };

        const mutation = await performer.mutate({
            mutation: ADD_PROVIDER,
            variables: {
                input,
            },
        });

        const response = mutation.data.addProvider;

        if (!response.status) {
            console.log('Could not add provider. Something went wrong.');
            return;
        }

        console.log(`Added '${type}' provider with name '${name}'.`);

        return;
    } catch (error) {
        console.log('Could not add provider. Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default addProvider;
// #endregion exports
