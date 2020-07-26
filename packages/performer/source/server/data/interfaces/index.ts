export type CodeProvider = 'bitbucket' | 'github';



export interface Repository {
    id: string;
}


export interface Build {
    id: string;
}


export interface Webhook {
    id: string;
    path: string;
    provider: string;
}


export interface Trigger {
    id: string;
    name: string;
    repository: string;
    branch: string;
    path: string;
}
