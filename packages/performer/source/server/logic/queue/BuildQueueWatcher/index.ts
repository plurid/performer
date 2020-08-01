import {
    buildqueuePath,
} from '#server/data/constants';

import {
    BuildData,
} from '#server/data/interfaces';

import {
    triggerBuild,
} from '#server/logic/build';

import {
    loadBuildsQueued,
} from '#server/logic/loader';

import {
    removeFromQueue,
} from '../general';



class BuildQueueWatcher {
    private inQueue: number = 0;
    private queuedBuilds: BuildData[] = [];

    constructor() {
        this.getQueuedBuilds();
    }

    async getQueuedBuilds() {
        const queuedBuilds = await loadBuildsQueued();

        for (const queuedBuild of queuedBuilds) {
            this.handleQueuedBuild(queuedBuild);
        }
    }

    async handleQueuedBuild(
        buildData: BuildData,
    ) {
        await triggerBuild(buildData);

        await removeFromQueue(buildData.id);
    }

    async startWatcher() {
    }
}


export default BuildQueueWatcher;
