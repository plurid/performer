import {
    ClientProvider,
    Repository,
    Webhook,
    Trigger,
    Build,
} from '#server/data/interfaces';



export const SET_ACTIVE_PROVIDER_ID = 'SET_ACTIVE_PROVIDER_ID';
export interface SetActiveProviderIDAction {
    type: typeof SET_ACTIVE_PROVIDER_ID;
    payload: string;
}


export const SET_PROVIDERS = 'SET_PROVIDERS';
export interface SetProvidersAction {
    type: typeof SET_PROVIDERS;
    payload: ClientProvider[];
}


export const REMOVE_PROVIDER = 'REMOVE_PROVIDER';
export interface RemoveProviderAction {
    type: typeof REMOVE_PROVIDER;
    payload: string;
}


export const SET_REPOSITORIES = 'SET_REPOSITORIES';
export interface SetRepositoriesAction {
    type: typeof SET_REPOSITORIES;
    payload: Repository[];
}


export const REMOVE_REPOSITORY = 'REMOVE_REPOSITORY';
export interface RemoveRepositoryAction {
    type: typeof REMOVE_REPOSITORY;
    payload: string;
}


export const SET_WEBHOOKS = 'SET_WEBHOOKS';
export interface SetWebhooksAction {
    type: typeof SET_WEBHOOKS;
    payload: Webhook[];
}


export const REMOVE_WEBHOOK = 'REMOVE_WEBHOOK';
export interface RemoveWebhookAction {
    type: typeof REMOVE_WEBHOOK;
    payload: string;
}


export const SET_TRIGGERS = 'SET_TRIGGERS';
export interface SetTriggersAction {
    type: typeof SET_TRIGGERS;
    payload: Trigger[];
}


export const REMOVE_TRIGGER = 'REMOVE_TRIGGER';
export interface RemoveTriggerAction {
    type: typeof REMOVE_TRIGGER;
    payload: string;
}


export const SET_BUILDS = 'SET_BUILDS';
export interface SetBuildsAction {
    type: typeof SET_BUILDS;
    payload: Build[];
}

export const CLEAR_BUILDS = 'CLEAR_BUILDS';
export interface ClearBuildsAction {
    type: typeof CLEAR_BUILDS;
    payload: undefined;
}



export interface State {
    activeProviderID: string;
    providers: ClientProvider[];
    repositories: Repository[];
    webhooks: Webhook[];
    triggers: Trigger[];
    builds: Build[];
}


export type Actions =
    | SetActiveProviderIDAction
    | SetProvidersAction
    | RemoveProviderAction
    | SetRepositoriesAction
    | RemoveRepositoryAction
    | SetWebhooksAction
    | RemoveWebhookAction
    | SetTriggersAction
    | RemoveTriggerAction
    | SetBuildsAction
    | ClearBuildsAction;
