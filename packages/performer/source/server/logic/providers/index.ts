import {
    GITHUB_TOKEN,
    GITHUB_PROVIDER,
    BITBUCKET_TOKEN,
    BITBUCKET_PROVIDER,
} from '#server/data/constants';



export const getProviders = async () => {
    const githubProvider = GITHUB_TOKEN ? true : false;
    const bitbucketProvider = BITBUCKET_TOKEN ? true : false;

    const providers: string[] = [];

    if (githubProvider) {
        providers.push(GITHUB_PROVIDER);
    }

    if (bitbucketProvider) {
        providers.push(BITBUCKET_PROVIDER);
    }

    return providers;
}
