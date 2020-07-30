/** [START] imports */
/** libraries */
import React from 'react';

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconQueue,
    PluridIconRunning,
    PluridIconWarning,
    PluridIconStopped,
    PluridIconTimeout,
    PluridIconValid,
    PluridIconCircle,
    PluridIconEnter,
} from '@plurid/plurid-icons-react';


/** external */
import {
    Build,
} from '#server/data/interfaces';

import EntityView from '#kernel-components/EntityView';

import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
import actions from '#kernel-services/state/actions';

/** internal */
/** [END] imports */



const buildStatusIcons = {
    QUEUE: PluridIconQueue,
    RUNNING: PluridIconRunning,
    FAILED: PluridIconWarning,
    SUCCESS: PluridIconValid,
    CANCELLED: PluridIconStopped,
    TIMEOUT: PluridIconTimeout,
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
export interface BuildsViewOwnProperties {
    /** required */
    /** - values */
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

export interface BuildsViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateBuilds: Build[];
}

export interface BuildsViewDispatchProperties {
    dispatchRemoveEntity: typeof actions.data.removeEntity;
}

export type BuildsViewProperties = BuildsViewOwnProperties
    & BuildsViewStateProperties
    & BuildsViewDispatchProperties;

const BuildsView: React.FC<BuildsViewProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        /** - methods */

        /** optional */
        /** - values */
        /** - methods */

        /** state */
        stateGeneralTheme,
        stateInteractionTheme,
        stateBuilds,

        /** dispatch */
        dispatchRemoveEntity,
    } = properties;


    /** render */
    const rowsHeader = (
        <>
            <PluridIconCircle
                fill={true}
                inactive={true}
                size={20}
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

    const rows = stateBuilds.map(build => {
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
                    size={20}
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
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="30px auto 180px 200px 30px"
            rowsHeader={rowsHeader}
            rows={rows}
        />
    );
}


const mapStateToProperties = (
    state: AppState,
): BuildsViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateBuilds: selectors.data.getBuilds(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): BuildsViewDispatchProperties => ({
    dispatchRemoveEntity: (
        payload,
    ) => dispatch (
        actions.data.removeEntity(payload),
    ),
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(BuildsView);
/** [END] component */
