import * as Types from './types';



export const removeEntity = (
    state: Types.State,
    action: Types.RemoveEntityAction,
): Types.State => {
    const {
        id,
        type,
    } = action.payload;

    const newState = {
        ...state,
    };

    let providers = [
        ...newState.providers,
    ];
    let repositories = [
        ...newState.repositories,
    ];
    let webhooks = [
        ...newState.webhooks,
    ];
    let projects = [
        ...newState.projects,
    ];
    let secrets = [
        ...newState.secrets,
    ];
    let triggers = [
        ...newState.triggers,
    ];

    switch (type) {
        case 'provider':
            providers = providers.filter(
                provider => provider.id !== id
            );
            break;
        case 'repository':
            repositories = repositories.filter(
                repository => repository.id !== id
            );
            break;
        case 'webhook':
            webhooks = webhooks.filter(
                webhook => webhook.id !== id
            );
            break;
        case 'project':
            projects = projects.filter(
                project => project.id !== id
            );
            break;
        case 'secret':
            secrets = secrets.filter(
                secret => secret.id !== id
            );
            break;
        case 'trigger':
            triggers = triggers.filter(
                trigger => trigger.id !== id
            );
            break;
    }

    return {
        ...newState,
        providers: [
            ...providers,
        ],
        repositories: [
            ...repositories,
        ],
        webhooks: [
            ...webhooks,
        ],
        projects: [
            ...projects,
        ],
        secrets: [
            ...secrets,
        ],
        triggers: [
            ...triggers,
        ],
    };
}


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


export const setImagenes = (
    state: Types.State,
    action: Types.SetImagenesAction,
): Types.State => {
    return {
        ...state,
        imagenes: [
            ...action.payload,
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


export const setProjects = (
    state: Types.State,
    action: Types.SetProjectsAction,
): Types.State => {
    return {
        ...state,
        projects: [
            ...action.payload,
        ],
    };
}


export const setSecrets = (
    state: Types.State,
    action: Types.SetSecretsAction,
): Types.State => {
    return {
        ...state,
        secrets: [
            ...action.payload,
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
    removeEntity,
    setActiveProviderID,
    setProviders,
    setImagenes,
    setRepositories,
    setWebhooks,
    setProjects,
    setSecrets,
    setTriggers,
    setBuilds,
    clearBuilds,
};
