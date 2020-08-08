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
    stages: string[];
    project: string;
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
    project: string;
}


export interface Performer {
    stages: PerformerStage[];
    timeout: number;
    secrets?: string[];
    nodejs?: any;
}


export interface PerformerStage {
    name: string;
    imagene: string;
    command: string | string[];
    directory?: string;
    environment?: string[];
    secretsEnvironment?: string[];
}


export interface PerformContext {
    timeout: number;
    nodejs: any;
    secrets?: string[]
    workDirectoryPath: string;
    performerFilePath: string;
}


export interface Commit {
    id: string;
    added: string[];
    removed: string[];
    modified: string[];
}


export interface BuildData {
    id: string;
    commit: string;
    trigger: Trigger;
    date: number;
    repositoryPath: string;
    repositoryRootPath: string;
    repositoryWorkPath: string;
    branchName: string;
}


export interface Project {
    id: string;
    name: string;
}


export interface Secret {
    id: string;
    name: string;
    endsWith: string;
    project: string;
}

export interface SecretStored {
    id: string;
    name: string;
    value: string;
    project: string;
}


export interface Deployer {
    id: string;
    name: string;
    repository: string;
    branch: string;
    path: string;
    file: string;
    project: string;
}

export interface Deploy {
    id: string;
    status: string;
    trigger: string;
    time: number;
    date: number;
    stages: string[];
    project: string;
}



export interface Context {
    request: express.Request;
    response: express.Response;
    instance: express.Express;
    providers: Provider[];
    imagenes: Imagene[];
    repositories: Repository[];
    webhooks: Webhook[];
    projects: Project[];
    secrets: Secret[];
    triggers: Trigger[];
    deployers: Deployer[];
    builds: Build[];
    deploys: Deploy[];
}
