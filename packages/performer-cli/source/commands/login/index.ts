// #region imports
    // #region external
    import client from '../../services/graphql/client';
    import {
        LOGIN,
    } from '../../services/graphql/mutate';

    import {
        extractServerName,

        updateConfigurationFile,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const login = async (
    server: string,
    identonym: string,
    key: string,
) => {
    const performer = client(
        server,
    );

    const serverName = extractServerName(server);

    const data = {
        server,
        identonym,
        key,
    };

    try {
        const mutation = await performer.mutate({
            mutation: LOGIN,
            variables: {
                input: {
                    identonym,
                    key,
                },
            },
        });

        const response = mutation.data.login;

        if (!response.status) {
            console.log(`Could not log in into the performer server '${serverName}' as '${identonym}'.`);
            return;
        }

        // HACK
        // to allow the token writing inside the apollo afterwareLink
        setTimeout(async () => {
            await updateConfigurationFile(data);
        }, 1000);

        console.log(`Logged in the performer server '${serverName}' as '${identonym}'.`);
    } catch (error) {
        console.log(`Could not log in into the performer server '${serverName}' as '${identonym}'.`);
    }
}
// #endregion module



// #region exports
export default login;
// #endregion exports
