// #region imports
    // #region libraries
    import syncFs, {
        promises as fs,
    } from 'fs';

    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        buildQueuePath,
    } from '~server/data/constants';

    import {
        BuildData,
    } from '~server/data/interfaces';

    // import {
    //     triggerBuild,
    // } from '~server/logic/build/triggerBuild';

    import {
        triggerBuildInWorker,
    } from '~server/logic/worker';

    import {
        loadBuildsQueued,
    } from '~server/logic/loader';

    import {
        removeFromQueue,
    } from '../general';
    // #endregion external
// #endregion imports



// #region module
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
        triggerBuildInWorker(buildData);

        await removeFromQueue(buildData.id);
    }

    async handleFile(
        filename: string,
    ) {
        try {
            this.inQueue += 1;

            const filepath = path.join(
                buildQueuePath,
                '/' + filename,
            );

            const exists = syncFs.existsSync(filepath);
            if (!exists) {
                return;
            }

            const rawData = await fs.readFile(filepath, 'utf-8');
            const data: BuildData = JSON.parse(rawData);

            await this.handleQueuedBuild(data);

            this.inQueue -= 1;
        } catch (error) {
            return;
        }
    }

    startWatcher() {
        syncFs.watch(buildQueuePath, (
            event,
            filename,
        ) => {
            if (event === 'rename') {
                this.handleFile(filename);
            }
        });
    }
}
// #endregion module



// #region exports
export default BuildQueueWatcher;
// #endregion exports
