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
    PluridIconEdit,
    PluridIconDelete,
} from '@plurid/plurid-icons-react';


/** external */
import {
    Trigger,
} from '#server/data/interfaces';

import EntityView from '#kernel-components/EntityView';

import client from '#kernel-services/graphql/client';
import {
    OBLITERATE_TRIGGER,
} from '#kernel-services/graphql/mutate';

import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
import actions from '#kernel-services/state/actions';

/** internal */
/** [END] imports */



/** [START] component */
export interface TriggersViewOwnProperties {
    /** required */
    /** - values */
    /** - methods */
    setGeneralView: any;

    /** optional */
    /** - values */
    /** - methods */
}

export interface TriggersViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateTriggers: Trigger[];
}

export interface TriggersViewDispatchProperties {
    dispatchRemoveEntity: typeof actions.data.removeEntity;
}

export type TriggersViewProperties = TriggersViewOwnProperties
    & TriggersViewStateProperties
    & TriggersViewDispatchProperties;

const TriggersView: React.FC<TriggersViewProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        /** - methods */
        setGeneralView,

        /** optional */
        /** - values */
        /** - methods */

        /** state */
        stateGeneralTheme,
        stateInteractionTheme,
        stateTriggers,

        /** dispatch */
        dispatchRemoveEntity,
    } = properties;


    /** handlers */
    const handleObliterateTrigger = async (
        id: string,
    ) => {
        try {
            dispatchRemoveEntity({
                type: 'trigger',
                id,
            });

            const input = {
                value: id,
            };

            await client.mutate({
                mutation: OBLITERATE_TRIGGER,
                variables: {
                    input,
                },
            });
        } catch (error) {
            return;
        }
    }


    /** render */
    const rowsHeader = (
        <>
            <div>
                name
            </div>

            <div>
                repository
            </div>

            <div>
                branch
            </div>

            <div>
                path
            </div>

            <div />

            <div />
        </>
    );

    const rows = stateTriggers.map(trigger => {
        const {
            id,
            name,
            repository,
            branch,
            path,
        } = trigger;

        return (
            <>
                <div>
                    {name}
                </div>

                <div>
                    {repository}
                </div>

                <div>
                    {branch}
                </div>

                <div>
                    {path}
                </div>

                <PluridIconEdit
                    atClick={() => {}}
                />

                <PluridIconDelete
                    atClick={() => handleObliterateTrigger(id)}
                />
            </>
        );
    });

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="2fr 1fr 1fr 2fr 30px 30px"
            rowsHeader={rowsHeader}
            rows={rows}
            noRows="no triggers"

            actionButtonText="Add Trigger"
            actionButtonClick={() => {
                setGeneralView('add-trigger')
            }}
        />
    );
}


const mapStateToProperties = (
    state: AppState,
): TriggersViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateTriggers: selectors.data.getTriggers(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): TriggersViewDispatchProperties => ({
    dispatchRemoveEntity: (
        payload,
    ) => dispatch (
        actions.data.removeEntity(payload),
    ),
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(TriggersView);
/** [END] component */
