import {
    ClientProvider,
    Repository,
    Webhook,
    Trigger,
    Build,
    Imagene,
} from '#server/data/interfaces';



export type RemovableEntityType =
    | 'provider'
    | 'repository'
    | 'webhook'
    | 'trigger'
    | 'imagene';

export const REMOVE_ENTITY = 'REMOVE_ENTITY';
export interface RemoveEntityPayload {
    type: RemovableEntityType;
    id: string;
}
export interface RemoveEntityAction {
    type: typeof REMOVE_ENTITY;
    payload: RemoveEntityPayload;
}


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

export const CLEAR_BUILDS = 'CLEAR_BUILDS';
export interface ClearBuildsAction {
    type: typeof CLEAR_BUILDS;
    payload: undefined;
}


export const SET_IMAGENES = 'SET_IMAGENES';
export interface SetImagenesAction {
    type: typeof SET_IMAGENES;
    payload: Imagene[];
}



export interface State {
    activeProviderID: string;
    providers: ClientProvider[];
    repositories: Repository[];
    webhooks: Webhook[];
    triggers: Trigger[];
    builds: Build[];
    imagenes: Imagene[];
}


export type Actions =
    | RemoveEntityAction
    | SetActiveProviderIDAction
    | SetProvidersAction
    | SetRepositoriesAction
    | SetWebhooksAction
    | SetTriggersAction
    | SetBuildsAction
    | ClearBuildsAction
    | SetImagenesAction;
