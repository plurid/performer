import syncFs, {
    promises as fs,
} from 'fs';

import path from 'path';

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

    async handleFile(
        filename: string,
    ) {
        try {
            const filepath = path.join(
                buildqueuePath,
                '/' + filename,
            );

            const exists = syncFs.existsSync(filepath);
            if (!exists) {
                return;
            }

            const rawData = await fs.readFile(filepath, 'utf-8');
            const data: BuildData = JSON.parse(rawData);

            this.handleQueuedBuild(data);
        } catch (error) {
            return;
        }
    }

    startWatcher() {
        syncFs.watch(buildqueuePath, (
            _,
            filename,
        ) => {
            this.handleFile(filename);
        });
    }
}


export default BuildQueueWatcher;
