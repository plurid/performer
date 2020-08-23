// #region imports
    // #region external
    import {
        Build,
        Performer,
        PerformerStage,
        BuildData,
        PerformContext,
    } from '#server/data/interfaces';

    import database from '#server/services/database';
    // #endregion external


    // #region internal
    import {
        resolveImagene,
        resolveSecrets,
    } from './resolvers';

    import {
        runDockerCommand,
        runKubernetesCommand,
        runInContainer,
    } from './runners';
    // #endregion internal
// #endregion imports



// #region module
export const handlePerformer = async (
    buildData: BuildData,
    performerTriggerData: {
        performer: Performer,
        performerFilePath: string,
    },
    workDirectoryPath: string,
    project: string,
) => {
    const {
        performer,
        performerFilePath,
    } = performerTriggerData;


    const start = Date.now();

    const {
        id,
        trigger,
        date,
        commit,
    } = buildData;

    const {
        stages,
        timeout,
        nodejs,
        secrets,
    } = performer;

    const performContext: PerformContext = {
        timeout,
        nodejs,
        secrets,
        workDirectoryPath,
        performerFilePath,
    };

    for (const [index, stage] of stages.entries()) {
        console.log('Running stage', index, stage);
        await handleStage(
            id,
            stage,
            index,
            performContext,
            start,
            commit,
            project,
        );
    }

    const end = Date.now();
    const time = Math.floor((end - start) / 1000);

    const stagesNames = stages.map(stage => stage.name);

    const build: Build = {
        id,
        status: 'SUCCESS',
        trigger: trigger.id,
        time,
        date,
        stages: [
            ...stagesNames,
        ],
        project,
    };

    await database.store(
        'build',
        id,
        build,
    );
}


export const handleStage = async (
    id: string,
    stage: PerformerStage,
    index: number,
    performContext: PerformContext,
    start: number,
    commit: string,
    project: string,
) => {
    const {
        imagene,
        environment,
        secretsEnvironment,
    } = stage;

    const {
        secrets,
    } = performContext;

    const resolvedImagene = resolveImagene(imagene);

    if (!resolvedImagene) {
        return;
    }

    const resolvedSecretsEnvironment = await resolveSecrets(
        project,
        secrets,
        secretsEnvironment,
    );

    const environmentValues = [
        ...(environment || []),
        ...resolvedSecretsEnvironment,
    ];


    if (resolvedImagene === 'docker') {
        await runDockerCommand(
            id,
            stage,
            index,
            performContext,
            commit,
            environmentValues,
        );
        return;
    }

    if (resolvedImagene === 'kubectl') {
        await runKubernetesCommand(
            id,
            stage,
            index,
            performContext,
            environmentValues,
        );
        return;
    }

    await runInContainer(
        id,
        stage,
        index,
        performContext,
        resolvedImagene,
        environmentValues,
    );
}
// #endregion module
