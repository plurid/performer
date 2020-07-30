import * as Types from './types';



export const setActiveProviderID = (
    state: Types.State,
    action: Types.SetActiveProviderIDAction,
): Types.State => {
    return {
        ...state,
        activeProviderID: action.payload,
    };
}


export const setProviders = (
    state: Types.State,
    action: Types.SetProvidersAction,
): Types.State => {
    return {
        ...state,
        providers: [
            ...action.payload,
        ],
    };
}


export const removeProvider = (
    state: Types.State,
    action: Types.RemoveProviderAction,
): Types.State => {
    const newState = {
        ...state,
    };

    const newProviders = newState.providers.filter(
        provider => provider.id !== action.payload,
    );

    return {
        ...newState,
        providers: [
            ...newProviders,
        ],
    };
}


export const setRepositories = (
    state: Types.State,
    action: Types.SetRepositoriesAction,
): Types.State => {
    return {
        ...state,
        repositories: [
            ...action.payload,
        ],
    };
}


export const removeRepository = (
    state: Types.State,
    action: Types.RemoveRepositoryAction,
): Types.State => {
    const newState = {
        ...state,
    };

    const newRepositories = newState.repositories.filter(
        repository => repository.id !== action.payload,
    );

    return {
        ...newState,
        repositories: [
            ...newRepositories,
        ],
    };
}


export const setWebhooks = (
    state: Types.State,
    action: Types.SetWebhooksAction,
): Types.State => {
    return {
        ...state,
        webhooks: [
            ...action.payload,
        ],
    };
}


export const removeWebhook = (
    state: Types.State,
    action: Types.RemoveWebhookAction,
): Types.State => {
    const newState = {
        ...state,
    };

    const newWebhooks = newState.webhooks.filter(
        webhook => webhook.id !== action.payload,
    );

    return {
        ...newState,
        webhooks: [
            ...newWebhooks,
        ],
    };
}


export const setTriggers = (
    state: Types.State,
    action: Types.SetTriggersAction,
): Types.State => {
    return {
        ...state,
        triggers: [
            ...action.payload,
        ],
    };
}


export const removeTrigger = (
    state: Types.State,
    action: Types.RemoveTriggerAction,
): Types.State => {
    const newState = {
        ...state,
    };

    const newTriggers = newState.triggers.filter(
        trigger => trigger.id !== action.payload,
    );

    return {
        ...newState,
        triggers: [
            ...newTriggers,
        ],
    };
}


export const setBuilds = (
    state: Types.State,
    action: Types.SetBuildsAction,
): Types.State => {
    return {
        ...state,
        builds: [
            ...action.payload,
        ],
    };
}


export const clearBuilds = (
    state: Types.State,
    action: Types.ClearBuildsAction,
): Types.State => {
    return {
        ...state,
        builds: [],
    };
}



export const resolvers = {
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
