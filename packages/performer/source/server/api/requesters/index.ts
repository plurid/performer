import github from './github';



export const getRepositories = async (
    provider: 'bitbucket' | 'github',
) => {
    switch (provider) {
        case 'bitbucket':
            return;
        case 'github':
            return;
    }
}


export const getOwner = async (
    provider: 'bitbucket' | 'github',
) => {
    switch (provider) {
        case 'bitbucket':
            return;
        case 'github':
            return github.getOwner();
    }
}
