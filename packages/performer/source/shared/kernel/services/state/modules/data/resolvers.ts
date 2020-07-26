import * as Types from './types';



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



export const resolvers = {
    setRepositories,
    setWebhooks,
    setTriggers,
    setBuilds,
};
