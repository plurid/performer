import {
    Express,
} from 'express';

import PluridServer from '@plurid/plurid-react-server';

import {
    loadWebhooks,
} from '#server/logic/loader';

import {
    handleWebhooks,
} from '#server/logic/webhooks';

import {
    BuildQueueWatcher,
} from '#server/logic/queue';

import setupGraphQLServer from './graphql';



const setupWebhooks = async (
    instance: Express,
) => {
    const webhooks = await loadWebhooks();

    handleWebhooks(
        webhooks,
        instance,
    );
}


export const setRouteHandlers = (
    server: PluridServer,
) => {
    const handler = server.handle();
    const instance = server.instance();

    handler.post('/service-check/health', (request, response, next) => {
        response.setHeader('Content-Type', 'application/json');
        response.end(
            JSON.stringify(
                { status: true },
            ),
        );
    });

    setupWebhooks(instance);

    setupGraphQLServer(instance);

    const buildQueue = new BuildQueueWatcher();
    buildQueue.startWatcher();
}
