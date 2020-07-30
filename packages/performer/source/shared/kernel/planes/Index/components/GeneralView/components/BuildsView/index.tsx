/** [START] imports */
/** libraries */
import React, {
    useState,
} from 'react';

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
    compareValues,
} from '#server/utilities';

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

const buildRowRenderer = (
    build: Build,
    openBuild: (id: string) => void,
) => {
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
                {id.slice(0, 6)}
            </div>

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
                atClick={() => openBuild(id)}
            />
        </>
    );
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
    } = properties;


    /** handlers */
    const openBuild = (
        id: string,
    ) => {
    }


    /** state */
    const [filteredRows, setFilteredRows] = useState(
        stateBuilds.map(
            build => buildRowRenderer(
                build,
                openBuild,
            ),
        ),
    );


    const filterUpdate = (
        rawValue: string,
    ) => {
        const value = rawValue.toLowerCase();

        const filteredBuildsByTrigger = stateBuilds.filter(
            build => build.trigger.toLowerCase().includes(value),
        );

        const filteredBuildsByID = stateBuilds.filter(
            build => {
                if (
                    build.id.includes(value)
                ) {
                    for (const filteredBuildByTrigger of filteredBuildsByTrigger) {
                        if (filteredBuildByTrigger.id === build.id) {
                            return false;
                        }
                    }

                    return true;
                }

                return false;
            },
        );

        const filteredBuildsByDuration = stateBuilds.filter(
            build => {
                if (
                    durationTime(build.time).toLowerCase().includes(value)
                ) {
                    for (const filteredBuildByTrigger of filteredBuildsByTrigger) {
                        if (filteredBuildByTrigger.id === build.id) {
                            return false;
                        }
                    }

                    for (const filteredBuildByID of filteredBuildsByID) {
                        if (filteredBuildByID.id === build.id) {
                            return false;
                        }
                    }

                    return true;
                }

                return false;
            },
        );

        const filteredBuildsByStatus = stateBuilds.filter(
            build => {
                if (
                    build.status.toLowerCase().includes(value)
                ) {
                    for (const filteredBuildByTrigger of filteredBuildsByTrigger) {
                        if (filteredBuildByTrigger.id === build.id) {
                            return false;
                        }
                    }

                    for (const filteredBuildByID of filteredBuildsByID) {
                        if (filteredBuildByID.id === build.id) {
                            return false;
                        }
                    }

                    for (const filteredBuildByDuration of filteredBuildsByDuration) {
                        if (filteredBuildByDuration.id === build.id) {
                            return false;
                        }
                    }

                    return true;
                }

                return false;
            },
        );

        const filteredBuilds = [
            ...filteredBuildsByTrigger,
            ...filteredBuildsByID,
            ...filteredBuildsByDuration,
            ...filteredBuildsByStatus,
        ];

        const sortedBuilds = filteredBuilds.sort(
            compareValues('date', 'desc'),
        );

        setFilteredRows(
            sortedBuilds.map(
                build => buildRowRenderer(
                    build,
                    openBuild,
                ),
            ),
        );
    }


    /** render */
    const rowsHeader = (
        <>
            <PluridIconCircle
                fill={true}
                inactive={true}
                size={20}
            />

            <div>
                id
            </div>

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

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="30px 60px auto 180px 200px 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no builds"

            filterUpdate={filterUpdate}
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
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(BuildsView);
/** [END] component */
