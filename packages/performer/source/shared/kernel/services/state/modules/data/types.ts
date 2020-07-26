import {
    Repository,
    Webhook,
    Trigger,
    Build,
} from '#server/data/interfaces';



export const SET_PROVIDERS = 'SET_PROVIDERS';
export interface SetProvidersAction {
    type: typeof SET_PROVIDERS;
    payload: string[];
}


export const SET_REPOSITORIES = 'SET_REPOSITORIES';
export interface SetRepositoriesAction {
    type: typeof SET_REPOSITORIES;
    payload: Repository[];
}


export const SET_WEBHOOKS = 'SET_WEBHOOKS';
export interface SetWebhooksAction {
    type: typeof SET_WEBHOOKS;
    payload: Webhook[];
}


export const SET_TRIGGERS = 'SET_TRIGGERS';
export interface SetTriggersAction {
    type: typeof SET_TRIGGERS;
    payload: Trigger[];
}


export const SET_BUILDS = 'SET_BUILDS';
export interface SetBuildsAction {
    type: typeof SET_BUILDS;
    payload: Build[];
}



export interface State {
    providers: string[];
    repositories: Repository[];
    webhooks: Webhook[];
    triggers: Trigger[];
    builds: Build[];
}


export type Actions =
    | SetProvidersAction
    | SetRepositoriesAction
    | SetWebhooksAction
    | SetTriggersAction
    | SetBuildsAction;
