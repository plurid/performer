import {
    AppState,
} from '../store';



const getProviders = (state: AppState) => state.data.providers;
const getRepositories = (state: AppState) => state.data.repositories;
const getWebhooks = (state: AppState) => state.data.webhooks;
const getTriggers = (state: AppState) => state.data.triggers;
const getBuilds = (state: AppState) => state.data.builds;


const selectors = {
    getProviders,
    getRepositories,
    getWebhooks,
    getTriggers,
    getBuilds,
};


export default selectors;
