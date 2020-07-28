import github from './github';

import {
    loadProviders,
} from '#server/logic/loader';

import {
    BITBUCKET_PROVIDER,
    GITHUB_PROVIDER,
} from '#server/data/constants';



export const getRepositoriesData = async (
    providerID: string,
) => {
    const providers = await loadProviders();
    const provider = providers.find(
        provider => provider.id === providerID,
    );

    if (!provider) {
        return;
    }

    switch (provider.type) {
        case BITBUCKET_PROVIDER:
            return;
        case GITHUB_PROVIDER:
            return github.getRepositoriesData(
                provider,
            );
    }
}


export const getRepositoryDataByNameWithOwner = async (
    providerID: string,
    nameWithOwner: string,
) => {
    const providers = await loadProviders();
    const provider = providers.find(
        provider => provider.id === providerID,
    );

    if (!provider) {
        return;
    }

    switch (provider.type) {
        case BITBUCKET_PROVIDER:
            return;
        case GITHUB_PROVIDER:
            return github.getRepositoryDataByNameWithOwner(
                provider,
                nameWithOwner,
            );
    }
}


export const getRepository = async (
    provider: 'bitbucket' | 'github',
    url: string,
    name: string,
) => {
    switch (provider) {
        case 'bitbucket':
            return;
        case 'github':
            return github.getRepository(
                url,
                name,
            );
    }
}


export const getOwner = async (
    providerID: string,
) => {
    const providers = await loadProviders();
    const provider = providers.find(
        provider => provider.id === providerID,
    );

    if (!provider) {
        return;
    }

    switch (provider.type) {
        case 'bitbucket':
            return;
        case 'github':
            return github.getOwner(
                provider,
            );
    }
}
