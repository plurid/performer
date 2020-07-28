/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconValid,
    PluridIconCircle,
    PluridIconEnter,
} from '@plurid/plurid-icons-react';


/** external */
import {
    Build,
} from '#server/data/interfaces';

import EntityView from '#kernel-components/EntityView';

/** internal */
/** [END] imports */


const buildStatusIcons = {
    RUNNING: PluridIconValid,
    ERROR: PluridIconValid,
    SUCCESS: PluridIconValid,
    CANCELLED: PluridIconValid,
};

const durationTime = (
    value: number,
) => {
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes * 60;

    const timeString = `${minutes > 0 ? minutes + ' min' : ''} ${seconds} sec`;

    return timeString;
}


/** [START] component */
export interface BuildsViewProperties {
    /** required */
    /** - values */
    generalTheme: Theme;
    interactionTheme: Theme;
    data: Build[];
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

const BuildsView: React.FC<BuildsViewProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        generalTheme,
        interactionTheme,
        data,
        /** - methods */

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** render */
    const rowsHeader = (
        <>
            <PluridIconCircle
                fill={true}
                inactive={true}
            />

            <div>
                trigger
            </div>

            <div>
                duration
            </div>

            <div>
                triggered
            </div>

            <div />
        </>
    );

    const rows = data.map(build => {
        const {
            id,
            status,
            trigger,
            time,
            date,
        } = build;

        const durationString = durationTime(time);

        const dateString = new Date(date * 1000).toLocaleString();

        const StatusIcon = buildStatusIcons[status];

        return (
            <>
                <StatusIcon
                    inactive={true}
                />

                <div>
                    {trigger}
                </div>

                <div>
                    {durationString}
                </div>

                <div>
                    {dateString}
                </div>

                <PluridIconEnter
                    atClick={() => {}}
                />
            </>
        );
    });

    return (
        <EntityView
            generalTheme={generalTheme}
            interactionTheme={interactionTheme}

            rowTemplate="30px auto 180px 200px 30px"
            rowsHeader={rowsHeader}
            rows={rows}
        />
    );
}


export default BuildsView;
/** [END] component */
