import github from './github';



export const getRepositoriesData = async (
    provider: 'bitbucket' | 'github',
) => {
    switch (provider) {
        case 'bitbucket':
            return;
        case 'github':
            return github.getRepositoriesData();
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
    provider: 'bitbucket' | 'github',
) => {
    switch (provider) {
        case 'bitbucket':
            return;
        case 'github':
            return github.getOwner();
    }
}
