// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import Deon from '@plurid/deon';
    // #endregion libraries


    // #region external
    import {
        performerConfigurationPath,
    } from '../../data/constants';
    // #endregion external
// #endregion imports



// #region module
const status = async () => {
    const data = await fs.readFile(performerConfigurationPath, 'utf-8');
    const deon = new Deon();
    const ownerData = await deon.parse(data);

    if (ownerData.server) {
        console.log(`Logged in the performer server '${ownerData.server}' as '${ownerData.identonym}'.`);
        return;
    }

    console.log(`Not logged into a performer server.`);
}
// #endregion module



// #region exports
export default status;
// #endregion exports
