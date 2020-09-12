// #region imports
    // #region external
    import {
        readConfigurationFile,
    } from '../../services/utilities/configuration';
    // #endregion external
// #endregion imports



// #region module
const status = async () => {
    const ownerData = await readConfigurationFile();

    if (
        !ownerData.server
        || !ownerData.identonym
        || !ownerData.token
        || !ownerData.key
    ) {
        console.log(`Not logged into a performer server.`);
        return;
    }

    console.log(`Logged in the performer server '${ownerData.server}' as '${ownerData.identonym}'.`);
}
// #endregion module



// #region exports
export default status;
// #endregion exports
