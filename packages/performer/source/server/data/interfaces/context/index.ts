// #region imports
    // #region libraries
    import {
        Request,
        Response,
        Application,
    } from 'express';
    // #endregion libraries


    // #region external
    import {
        Provider,
        Imagene,
        Repository,
        Webhook,
        Project,
        Secret,
        Trigger,
        Deployer,
        Build,
        Deploy,
    } from '../general';

    import {
        PerformerLogic,
    } from '../logic';
    // #endregion external
// #endregion imports



// #region module
export interface Context {
    request: PerformerRequest;
    response: Response;
    instance: Application;
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


export type PerformerRequest = Request & {
    performerLogic: PerformerLogic | undefined;
    rawBody: string | undefined;
}
// #endregion module
