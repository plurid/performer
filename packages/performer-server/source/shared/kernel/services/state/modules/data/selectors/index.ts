// #region imports
    // #region external
    import {
        AppState,
    } from '../../../store';
    // #endregion external
// #endregion imports



// #region module
const getActiveProviderID = (state: AppState) => state.data.activeProviderID;
const getProviders = (state: AppState) => state.data.providers;
const getImagenes = (state: AppState) => state.data.imagenes;
const getNotifiers = (state: AppState) => state.data.notifiers;
const getRepositories = (state: AppState) => state.data.repositories;
const getWebhooks = (state: AppState) => state.data.webhooks;
const getProjects = (state: AppState) => state.data.projects;
const getSecrets = (state: AppState) => state.data.secrets;
const getTriggers = (state: AppState) => state.data.triggers;
const getDeployers = (state: AppState) => state.data.deployers;
const getBuilds = (state: AppState) => state.data.builds;
const getDeploys = (state: AppState) => state.data.deploys;



const selectors = {
    getActiveProviderID,
    getProviders,
    getImagenes,
    getNotifiers,
    getRepositories,
    getWebhooks,
    getProjects,
    getSecrets,
    getTriggers,
    getDeployers,
    getBuilds,
    getDeploys,
};
// #endregion module



// #region exports
export default selectors;
// #endregion exports
