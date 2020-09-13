// #region module
export type Notifier =
    | NotifierAPI
    | NotifierEmail;


export interface NotifierBase {
    id: string;
    notifyOn: NotificationType[];
}

export interface NotifierAPI extends NotifierBase {
    type: NotifierTypeAPI;
    data: ClientNotifierAPI;
}

export interface NotifierEmail extends NotifierBase {
    type: NotifierTypeEmail;
    data: ClientNotifierEmail;
}


export type NotifierTypeAPI = 'api';
export type NotifierTypeEmail = 'email';
export type NotifierType =
    | NotifierTypeAPI
    | NotifierTypeEmail;


export interface NotifierEmailBase {
    notifyTo: string[];
}

export interface StoredNotifierEmail extends NotifierEmailBase {
    authentication: NotifierEmailAuthentication;
}

export interface ClientNotifierEmail extends NotifierEmailBase {
    authentication: ClientNotifierEmailAuthentication;
}

export type ClientNotifierEmailAuthentication = Omit<NotifierEmailAuthentication, 'password'>;

export interface NotifierEmailAuthentication {
    host: string;
    port: number;
    secure: boolean;
    username: string;
    password: string;
    sender: string;
}


export interface NotifierAPIBase {
    endpoint: string;
}

export interface StoredNotifierAPI extends NotifierAPIBase {
    token: string;
}

export interface ClientNotifierAPI extends NotifierAPIBase {
    startsWith: string;
}


export interface Notification {
    status: 'SUCCESS' | 'ERROR';
    kind: 'REGISTER' | 'DEREGISTER';
    entity:
        | 'PROVIDER' | 'IMAGENE' | 'REPOSITORY' | 'WEBHOOK' | 'PROJECT' | 'SECRET' | 'TRIGGER' | 'DEPLOYER'
        | 'BUILD' | 'DEPLOY';
    data: string;
}

export type NotificationType =
    | 'REGISTER_PROVIDER'
    | 'DEREGISTER_PROVIDER'
    | 'REGISTER_IMAGENE'
    | 'DEREGISTER_IMAGENE'
    | 'REGISTER_REPOSITORY'
    | 'DEREGISTER_REPOSITORY'
    | 'REGISTER_WEBHOOK'
    | 'DEREGISTER_WEBHOOK'
    | 'REGISTER_PROJECT'
    | 'DEREGISTER_PROJECT'
    | 'REGISTER_SECRET'
    | 'DEREGISTER_SECRET'
    | 'REGISTER_TRIGGER'
    | 'DEREGISTER_TRIGGER'
    | 'REGISTER_DEPLOYER'
    | 'DEREGISTER_DEPLOYER'
    | 'REGISTER_BUILD'
    | 'DEREGISTER_BUILD'
    | 'REGISTER_DEPLOY'
    | 'DEREGISTER_DEPLOY';
// #endregion module
