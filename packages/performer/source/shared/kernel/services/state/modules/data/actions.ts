import * as Types from './types';

import {
    Repository,
    Webhook,
    Trigger,
    Build,
} from '#server/data/interfaces';



export const setRepositories = (
    repositories: Repository[],
): Types.SetRepositoriesAction => {
    return {
        type: Types.SET_REPOSITORIES,
        payload: repositories,
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


export const setTriggers = (
    triggers: Trigger[],
): Types.SetTriggersAction => {
    return {
        type: Types.SET_TRIGGERS,
        payload: triggers,
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



export const actions = {
    setRepositories,
    setWebhooks,
    setTriggers,
    setBuilds,
};
