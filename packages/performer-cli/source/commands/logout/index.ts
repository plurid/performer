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
const logout = async () => {
    const data = await fs.readFile(performerConfigurationPath, 'utf-8');
    const deon = new Deon();
    const ownerData = await deon.parse(data);

    if (ownerData.server) {
        await fs.writeFile(performerConfigurationPath, '');

        console.log(`Logged out identonym '${ownerData.identonym}' from the performer server '${ownerData.server}'.`);
        return;
    }

    console.log(`Not logged into a performer server.`);
}
// #endregion module



// #region exports
export default logout;
// #endregion exports
