// #region imports
    // #region external
    import storage from '#server/services/storage';
    // #endregion external


    // #region internal
    // import schedules from './schedules';
    // #endregion internal
// #endregion imports



// #region module
const setup = () => {
    try {
        storage.generateLocations();

        // schedules();
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export default setup;
// #endregion exports
