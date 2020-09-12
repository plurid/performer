// #region imports
    // #region external
    import {
        ConfigurationFile,
    } from '../../data/interfaces';

    import {
        readConfigurationFile,
        updateConfigurationFile,
    } from '../../services/utilities/configuration';
    // #endregion external
// #endregion imports



// #region module
const logout = async () => {
    const ownerData = await readConfigurationFile();

    if (!ownerData.server) {
        console.log(`Not logged into a performer server.`);
        return;
    }

    const data: ConfigurationFile = {
        identonym: '',
        key: '',
        server: '',
        token: '',
    };
    await updateConfigurationFile(data);

    console.log(`Logged out identonym '${ownerData.identonym}' from the performer server '${ownerData.server}'.`);
}
// #endregion module



// #region exports
export default logout;
// #endregion exports
