/** [START] imports */
/** libraries */
import React, {
    useState,
    useEffect,
} from 'react';

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridApplicationConfigurator,
    PluridPubSub,
    TOPICS,
} from '@plurid/plurid-react';

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
} from '#server/utilities/general';

import {
    Deploy,
} from '#server/data/interfaces';

import EntityView from '#kernel-components/EntityView';

import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
import actions from '#kernel-services/state/actions';

import {
    getFilterIDs,
} from '#kernel-services/utilities';

/** internal */
/** [END] imports */



const pluridPubSub = new PluridPubSub();

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


const createSearchTerms = (
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


/** [START] component */
export interface DeploysViewOwnProperties {
    /** required */
    /** - values */
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

export interface DeploysViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateDeploys: Deploy[];
}

export interface DeploysViewDispatchProperties {
}

export type DeploysViewProperties = DeploysViewOwnProperties
    & DeploysViewStateProperties
    & DeploysViewDispatchProperties;

const DeploysView: React.FC<DeploysViewProperties> = (
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
        stateDeploys,

        /** dispatch */
    } = properties;


    /** handlers */
    const openDeploy = (
        id: string,
    ) => {
        pluridPubSub.publish(
            TOPICS.VIEW_ADD_PLANE,
            {
                plane: `/build/${id}`,
            },
        );
    }


    /** state */
    const [searchTerms, setSearchTerms] = useState(
        createSearchTerms(stateDeploys),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateDeploys.map(
            build => buildRowRenderer(
                build,
                openDeploy,
            ),
        ),
    );


    /** functions */
    const filterUpdate = (
        rawValue: string,
    ) => {
        const value = rawValue.toLowerCase();

        const filterIDs = getFilterIDs(
            searchTerms,
            value,
        );

        const filteredDeploys = stateDeploys.filter(stateDeploy => {
            if (filterIDs.includes(stateDeploy.id)) {
                return true;
            }

            return false;
        });

        const sortedDeploys = filteredDeploys.sort(
            compareValues('date', 'desc'),
        );

        setFilteredRows(
            sortedDeploys.map(
                build => buildRowRenderer(
                    build,
                    openDeploy,
                ),
            ),
        );
    }


    /** effects */
    useEffect(() => {
        const searchTerms = createSearchTerms(stateDeploys);

        setSearchTerms(searchTerms);
    }, [
        stateDeploys,
    ]);


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
                deployer
            </div>

            <div>
                duration
            </div>

            <div>
                deployed
            </div>

            <div>
                project
            </div>

            <div />
        </>
    );

    return (
        <>
            <PluridApplicationConfigurator
                pubsub={pluridPubSub}
            />

            <EntityView
                generalTheme={stateGeneralTheme}
                interactionTheme={stateInteractionTheme}

                rowTemplate="30px 60px auto 180px 200px 200px 30px"
                rowsHeader={rowsHeader}
                rows={filteredRows}
                noRows="no deploys"

                filterUpdate={filterUpdate}
            />
        </>
    );
}


const mapStateToProperties = (
    state: AppState,
): DeploysViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateDeploys: selectors.data.getDeploys(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): DeploysViewDispatchProperties => ({
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(DeploysView);
/** [END] component */
