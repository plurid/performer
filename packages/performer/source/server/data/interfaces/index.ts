import express from 'express';



export type CodeProvider =
    | 'bitbucket'
    | 'github';



export interface Repository {
    id: string;
    name: string;
    isPrivate: boolean;
}


export interface Build {
    id: string;
}


export interface Webhook {
    id: string;
    path: string;
    provider: CodeProvider;
}


export interface Trigger {
    id: string;
    name: string;
    repository: string;
    branch: string;
    path: string;
}


export interface Context {
    request: express.Request,
    response: express.Response,
    instance: express.Express,
    webhooks: Webhook[],
    triggers: Trigger[],
    repositories: Repository[],
    builds: Build[],
    providers: string[];
}
