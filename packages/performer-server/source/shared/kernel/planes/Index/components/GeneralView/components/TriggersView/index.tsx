// #region imports
    // #region libraries
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
        OBLITERATE_TRIGGER,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        Trigger,
    } from '~server/data/interfaces';

    import {
        compareValues,
    } from '~server/utilities/general';

    import EntityView from '~kernel-components/EntityView';

    import {
        RUN_TRIGGER,
    } from '~kernel-services/graphql/mutate';
    import client from '~kernel-services/graphql/client';

    import {
        getSetup,
    } from '~kernel-services/logic/queries';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';

    import {
        getFilterIDs,
    } from '~kernel-services/utilities';
    // #endregion external


    // #region internal
    import {
        triggerRowRenderer,
        createSearchTerms,
    } from './logic';
    // #endregion internal
// #endregion imports



// #region module
export interface TriggersViewOwnProperties {
    // #region required
        // #region values
        // #endregion values

        // #region methods
        setGeneralView: any,
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion optional
}

export interface TriggersViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateTriggers: Trigger[];
}

export interface TriggersViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    dispatchRemoveEntity: typeof actions.data.removeEntity;
    dispatchViewSetEditID: typeof actions.view.setEditID;
}

export type TriggersViewProperties = TriggersViewOwnProperties
    & TriggersViewStateProperties
    & TriggersViewDispatchProperties;

const TriggersView: React.FC<TriggersViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            // #endregion values

            // #region methods
            setGeneralView,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional

        // #region state
        stateGeneralTheme,
        stateInteractionTheme,
        stateTriggers,
        // #endregion state

        // #region dispatch
        dispatch,
        dispatchRemoveEntity,
        dispatchViewSetEditID,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region handlers
    const handleTriggerRun = async (
        id: string,
    ) => {
        try {
            await client.mutate({
                mutation: RUN_TRIGGER,
                variables: {
                    input: {
                        id,
                    },
                },
            });

            return;
        } catch (error) {
            return;
        }
    }

    const handleTriggerEdit = async (
        id: string,
    ) => {
        dispatchViewSetEditID({
            type: 'trigger',
            value: id,
        });
        setGeneralView('generate-trigger');
    }

    const handleTriggerObliterate = async (
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
    // #endregion handlers


    // #region state
    const [searchTerms, setSearchTerms] = useState(
        createSearchTerms(stateTriggers),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateTriggers.map(
            trigger => triggerRowRenderer(
                trigger,
                handleTriggerRun,
                handleTriggerEdit,
                handleTriggerObliterate,
            ),
        ),
    );
    // #endregion state


    // #region handlers
    const filterUpdate = (
        rawValue: string,
    ) => {
        const value = rawValue.toLowerCase();

        const filterIDs = getFilterIDs(searchTerms, value);

        const filteredTriggers = stateTriggers.filter(stateTrigger => {
            if (filterIDs.includes(stateTrigger.id)) {
                return true;
            }

            return false;
        });

        const sortedTriggers = filteredTriggers.sort(
            compareValues('name'),
        );

        setFilteredRows(
            sortedTriggers.map(
                trigger => triggerRowRenderer(
                    trigger,
                    handleTriggerRun,
                    handleTriggerEdit,
                    handleTriggerObliterate,
                ),
            ),
        );
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        const searchTerms = createSearchTerms(
            stateTriggers,
        );
        const filteredRows = stateTriggers.map(
            trigger => triggerRowRenderer(
                trigger,
                handleTriggerRun,
                handleTriggerEdit,
                handleTriggerObliterate,
            ),
        );

        setSearchTerms(searchTerms);
        setFilteredRows(filteredRows);
    }, [
        stateTriggers,
    ]);
    // #endregion effects


    // #region render
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

            <div>
                performer
            </div>

            <div>
                project
            </div>

            <div />

            <div />

            <div />
        </>
    );

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="2fr 1fr 0.5fr 2fr 2fr 1fr 30px 30px 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no triggers"

            actionButtonText="Generate Trigger"
            actionButtonClick={() => {
                dispatchViewSetEditID({
                    type: 'trigger',
                    value: '',
                });
                setGeneralView('generate-trigger')
            }}

            filterUpdate={filterUpdate}
            refresh={() => {
                getSetup(dispatch);
            }}
        />
    );
    // #endregion render
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
    dispatch,
    dispatchRemoveEntity: (
        payload,
    ) => dispatch (
        actions.data.removeEntity(payload),
    ),
    dispatchViewSetEditID: (
        payload,
    ) => dispatch (
        actions.view.setEditID(payload),
    ),
});


const ConnectedTriggersView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(TriggersView);
// #endregion module



// #region exports
export default ConnectedTriggersView;
// #endregion exports
