// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridIconQueue,
        PluridIconRunning,
        PluridIconWarning,
        PluridIconStopped,
        PluridIconTimeout,
        PluridIconValid,
        PluridIconEnter,
    } from '@plurid/plurid-icons-react';

    import {
        PluridPubSub,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import {
        Deploy,
    } from '~server/data/interfaces';
    // #endregion externalr
// #endregion imports



// #region module
export const pluridPubSub = new PluridPubSub();

export const buildStatusIcons = {
    QUEUE: PluridIconQueue,
    RUNNING: PluridIconRunning,
    FAILED: PluridIconWarning,
    SUCCESS: PluridIconValid,
    CANCELLED: PluridIconStopped,
    TIMEOUT: PluridIconTimeout,
};

export const durationTime = (
    value: number,
) => {
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes * 60;

    const timeString = `${minutes > 0 ? minutes + ' min' : ''} ${seconds} sec`;

    return timeString;
}

export const buildRowRenderer = (
    build: Deploy,
    openDeploy: (
        id: string,
    ) => void,
) => {
    const {
        id,
        status,
        trigger,
        time,
        date,
        project,
    } = build;

    const durationString = durationTime(time);

    const dateString = new Date(date * 1000).toLocaleString();

    const StatusIcon = buildStatusIcons[status];

    return (
        <>
            <StatusIcon
                inactive={true}
                size={20}
            />

            <div>
                {id.slice(0, 6)}
            </div>

            <div>
                {trigger}
            </div>

            <div>
                {status === 'QUEUE'
                    ? '—'
                    : durationString
                }
            </div>

            <div>
                {dateString}
            </div>

            <div>
                {project}
            </div>

            <PluridIconEnter
                atClick={() => openDeploy(id)}
            />
        </>
    );
}


export const createSearchTerms = (
    builds: Deploy[],
) => {
    const searchTerms = builds.map(
        build => {
            const {
                id,
                status,
                trigger,
                time,
                date,
            } = build;

            const durationString = durationTime(time);
            const dateString = new Date(date * 1000).toLocaleString();

            const searchTerm = {
                id,
                data: [
                    id,
                    status.toLowerCase(),
                    trigger.toLowerCase(),
                    durationString.toLowerCase(),
                    dateString.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}
// #endregion module
