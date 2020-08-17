// #region imports
    // #region libraries
    import PluridServer from '@plurid/plurid-react-server';
    // #endregion libraries


    // #region external
    import {
        BuildQueueWatcher,
    } from '#server/logic/queue';
    // #endregion external


    // #region internal
    import setupGlobal from './global';
    import setupMiddleware from './middleware';
    import setupGraphQL from './graphql';
    import setupWebhooks from './webhooks';
    // #endregion internal
// #endregion imports



// #region module
const setupHandlers = (
    server: PluridServer,
    logic: any,
) => {
    setupGlobal();

    const instance = server.instance();

    setupMiddleware(instance);
    setupGraphQL(instance);
    setupWebhooks(instance);

    const buildQueue = new BuildQueueWatcher();
    buildQueue.startWatcher();
}
// #endregion module



// #region exports
export default setupHandlers;
// #endregion exports
