import {
    AppState,
} from '../store';



const gettRepositories = (state: AppState) => state.data.repositories;
const gettWebhooks = (state: AppState) => state.data.webhooks;
const gettTriggers = (state: AppState) => state.data.triggers;
const gettBuilds = (state: AppState) => state.data.builds;


const selectors = {
    gettRepositories,
    gettWebhooks,
    gettTriggers,
    gettBuilds,
};


export default selectors;
