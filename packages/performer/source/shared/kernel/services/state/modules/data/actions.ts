import * as Types from './types';

import {
    ClientProvider,
    Repository,
    Webhook,
    Trigger,
    Build,
} from '#server/data/interfaces';



export const setActiveProviderID = (
    providerID: string,
): Types.SetActiveProviderIDAction => {
    return {
        type: Types.SET_ACTIVE_PROVIDER_ID,
        payload: providerID,
    };
}


export const setProviders = (
    providers: ClientProvider[],
): Types.SetProvidersAction => {
    return {
        type: Types.SET_PROVIDERS,
        payload: providers,
    };
}


export const removeProvider = (
    id: string,
): Types.RemoveProviderAction => {
    return {
        type: Types.REMOVE_PROVIDER,
        payload: id,
    };
}


export const setRepositories = (
    repositories: Repository[],
): Types.SetRepositoriesAction => {
    return {
        type: Types.SET_REPOSITORIES,
        payload: repositories,
    };
}


export const removeRepository = (
    id: string,
): Types.RemoveRepositoryAction => {
    return {
        type: Types.REMOVE_REPOSITORY,
        payload: id,
    };
}


export const setWebhooks = (
    webhooks: Webhook[],
): Types.SetWebhooksAction => {
    return {
        type: Types.SET_WEBHOOKS,
        payload: webhooks,
    };
}


export const removeWebhook = (
    id: string,
): Types.RemoveWebhookAction => {
    return {
        type: Types.REMOVE_WEBHOOK,
        payload: id,
    };
}


export const setTriggers = (
    triggers: Trigger[],
): Types.SetTriggersAction => {
    return {
        type: Types.SET_TRIGGERS,
        payload: triggers,
    };
}


export const removeTrigger = (
    id: string,
): Types.RemoveTriggerAction => {
    return {
        type: Types.REMOVE_TRIGGER,
        payload: id,
    };
}


export const setBuilds = (
    builds: Build[],
): Types.SetBuildsAction => {
    return {
        type: Types.SET_BUILDS,
        payload: builds,
    };
}


export const clearBuilds = (): Types.ClearBuildsAction => {
    return {
        type: Types.CLEAR_BUILDS,
        payload: undefined,
    };
}



export const actions = {
    setActiveProviderID,
    setProviders,
    removeProvider,
    setRepositories,
    removeRepository,
    setWebhooks,
    removeWebhook,
    setTriggers,
    removeTrigger,
    setBuilds,
    clearBuilds,
};
