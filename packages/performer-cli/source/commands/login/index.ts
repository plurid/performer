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
    // #endregion external
// #endregion imports



// #region module
const login = async (
    server: string,
    identonym: string,
    key: string,
) => {
    const data = {
        server,
        identonym,
        key
    };

    const deon = new Deon();
    const deonData = deon.stringify(data);

    // try to login into the server
    // if true save file
    // else return error

    await fs.writeFile(
        performerConfigurationPath,
        deonData,
    );

    console.log(`Logged in the performer server '${server}' as '${identonym}'.`);
}
// #endregion module



// #region exports
export default login;
// #endregion exports
