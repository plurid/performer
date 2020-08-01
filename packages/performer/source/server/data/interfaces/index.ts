import express from 'express';



export type CodeProvider =
    | 'bitbucket'
    | 'github';



export interface Provider {
    id: string;
    token: string;
    type: CodeProvider;
    name: string;
}

export type ClientProvider = Omit<Provider, 'token'>;


export interface Repository {
    id: string;
    name: string;
    isPrivate: boolean;
    zipURL?: string;
}


export interface Build {
    id: string;
    status: string;
    trigger: string;
    time: number;
    date: number;
}


export interface Imagene {
    id: string;
    name: string;
    version: string;
    size: number;
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
    file: string;
}


export interface Context {
    request: express.Request,
    response: express.Response,
    instance: express.Express,
    webhooks: Webhook[],
    triggers: Trigger[],
    repositories: Repository[],
    builds: Build[],
    providers: Provider[];
    imagenes: Imagene[];
}
