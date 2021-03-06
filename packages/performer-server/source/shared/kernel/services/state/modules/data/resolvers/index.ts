// #region imports
    // #region internal
    import * as Types from '../types';

    import initialState from '../initial';
    // #endregion internal
// #endregion imports



// #region module
export const addEntity = (
    state: Types.State,
    action: Types.AddEntityAction,
): Types.State => {
    const {
        type,
        data,
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
    let deployers = [
        ...newState.deployers,
    ];

    switch (type) {
        case 'provider':
            providers = [
                ...providers,
                {
                    ...data,
                },
            ];
            break;
        case 'repository':
            repositories = [
                ...repositories,
                {
                    ...data,
                },
            ]
            break;
        case 'webhook':
            webhooks = [
                ...webhooks.filter(webhook => webhook.id !== data.id),
                {
                    ...data,
                },
            ]
            break;
        case 'project':
            projects = [
                ...projects,
                {
                    ...data,
                },
            ]
            break;
        case 'secret':
            secrets = [
                ...secrets,
                {
                    ...data,
                },
            ];
            break;
        case 'trigger':
            triggers = [
                ...triggers.filter(trigger => trigger.id !== data.id),
                {
                    ...data,
                },
            ];
            break;
        case 'deployer':
            deployers = [
                ...deployers,
                {
                    ...data,
                },
            ];
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
        deployers: [
            ...deployers,
        ],
    };
}


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
    let deployers = [
        ...newState.deployers,
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
        case 'deployer':
            deployers = deployers.filter(
                deployer => deployer.id !== id
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
        deployers: [
            ...deployers,
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


export const setDeployers = (
    state: Types.State,
    action: Types.SetDeployersAction,
): Types.State => {
    return {
        ...state,
        deployers: [
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


export const setDeploys = (
    state: Types.State,
    action: Types.SetDeploysAction,
): Types.State => {
    return {
        ...state,
        deploys: [
            ...action.payload,
        ],
    };
}


export const clearDeploys = (
    state: Types.State,
    action: Types.ClearDeploysAction,
): Types.State => {
    return {
        ...state,
        deploys: [],
    };
}


export const clearData = (
    state: Types.State,
    action: Types.ClearDataAction,
): Types.State => {
    return {
        ...initialState,
    };
}



const resolvers = {
    addEntity,
    removeEntity,
    setActiveProviderID,
    setProviders,
    setImagenes,
    setRepositories,
    setWebhooks,
    setProjects,
    setSecrets,
    setTriggers,
    setDeployers,
    setBuilds,
    clearBuilds,
    setDeploys,
    clearDeploys,
    clearData,
};
// #endregion module



// #region exports
export default resolvers;
// #endregion exports
