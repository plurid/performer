// #region imports
    // #region libraries
    import {
        ADD_PROVIDER,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        client,
    } from '../../services/graphql';

    import {
        readConfigurationFile,
        performerCookieFromToken,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const addProvider = async (
    type: string,
    name: string,
    token: string,
) => {
    const data = await readConfigurationFile();

    if (!data.token) {
        console.log('Could not add provider. Not logged in.');
        return;
    }

    try {
        const cookie = performerCookieFromToken(data.token);

        const performer = client(
            data.server,
            cookie,
        );

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
