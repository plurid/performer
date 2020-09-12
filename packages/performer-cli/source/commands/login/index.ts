// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import Deon from '@plurid/deon';
    // #endregion libraries


    // #region external
    import {
        performerConfigurationPath
    } from '../../data/constants';

    import client from '../../services/graphql/client';

    import {
        LOGIN,
    } from '../../services/graphql/mutate';

    import {
        extractServerName,
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
        key
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

        const deon = new Deon();
        const deonData = deon.stringify(data);

        await fs.writeFile(
            performerConfigurationPath,
            deonData,
        );

        console.log(`Logged in the performer server '${serverName}' as '${identonym}'.`);
    } catch (error) {
        console.log(`Could not log in into the performer server '${serverName}' as '${identonym}'.`);
    }
}
// #endregion module



// #region exports
export default login;
// #endregion exports
