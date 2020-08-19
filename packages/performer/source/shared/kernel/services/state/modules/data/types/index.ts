// #region imports
    // #region libraries
    import {
        ClientProvider,
        Imagene,
        Repository,
        Project,
        Secret,
        Webhook,
        Trigger,
        Deployer,
        Build,
        Deploy,
    } from '#server/data/interfaces';
    // #endregion libraries
// #endregion imports



// #region module
export type RemovableEntityType =
    | 'provider'
    | 'imagene'
    | 'repository'
    | 'webhook'
    | 'project'
    | 'secret'
    | 'trigger'
    | 'deployer';

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


export const SET_IMAGENES = 'SET_IMAGENES';
export interface SetImagenesAction {
    type: typeof SET_IMAGENES;
    payload: Imagene[];
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


export const SET_PROJECTS = 'SET_PROJECTS';
export interface SetProjectsAction {
    type: typeof SET_PROJECTS;
    payload: Project[];
}


export const SET_SECRETS = 'SET_SECRETS';
export interface SetSecretsAction {
    type: typeof SET_SECRETS;
    payload: Secret[];
}


export const SET_TRIGGERS = 'SET_TRIGGERS';
export interface SetTriggersAction {
    type: typeof SET_TRIGGERS;
    payload: Trigger[];
}


export const SET_DEPLOYERS = 'SET_DEPLOYERS';
export interface SetDeployersAction {
    type: typeof SET_DEPLOYERS;
    payload: Deployer[];
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


export const SET_DEPLOYS = 'SET_DEPLOYS';
export interface SetDeploysAction {
    type: typeof SET_DEPLOYS;
    payload: Deploy[];
}

export const CLEAR_DEPLOYS = 'CLEAR_DEPLOYS';
export interface ClearDeploysAction {
    type: typeof CLEAR_DEPLOYS;
    payload: undefined;
}


export const CLEAR_DATA = 'CLEAR_DATA';
export interface ClearDataAction {
    type: typeof CLEAR_DATA;
    payload: undefined;
}



export interface State {
    activeProviderID: string;
    providers: ClientProvider[];
    imagenes: Imagene[];
    repositories: Repository[];
    webhooks: Webhook[];
    projects: Project[];
    secrets: Secret[];
    triggers: Trigger[];
    deployers: Deployer[];
    builds: Build[];
    deploys: Deploy[];
}


export type Actions =
    | RemoveEntityAction
    | SetActiveProviderIDAction
    | SetProvidersAction
    | SetImagenesAction
    | SetRepositoriesAction
    | SetWebhooksAction
    | SetProjectsAction
    | SetSecretsAction
    | SetTriggersAction
    | SetDeployersAction
    | SetBuildsAction
    | ClearBuildsAction
    | SetDeploysAction
    | ClearDeploysAction
    | ClearDataAction;
// #endregion module
