// #region imports
    // #region external
    import storage from '#server/services/storage';
    // #endregion external
// #endregion imports



// #region module
const setup = () => {
    try {
        storage.generateLocations();
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export default setup;
// #endregion exports
