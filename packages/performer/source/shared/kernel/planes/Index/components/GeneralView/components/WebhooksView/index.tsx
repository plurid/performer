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
    // #endregion libraries


    // #region external
    import {
        Webhook,
    } from '#server/data/interfaces';

    import {
        compareValues,
    } from '#server/utilities/general';

    import EntityView from '#kernel-components/EntityView';

    import client from '#kernel-services/graphql/client';
    import {
        OBLITERATE_WEBHOOK,
    } from '#kernel-services/graphql/mutate';

    import { AppState } from '#kernel-services/state/store';
    import selectors from '#kernel-services/state/selectors';
    import actions from '#kernel-services/state/actions';

    import {
        getFilterIDs,
    } from '#kernel-services/utilities';
    // #endregion external


    // #region internal
    import {
        webhookRowRenderer,
        createSearchTerms,
    } from './logic';
    // #endregion internal
// #endregion imports



// #region module
export interface WebhooksViewOwnProperties {
    // #region required
        // #region values
        // #endregion values

        // #region methods
        setGeneralView: any;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion optional
}

export interface WebhooksViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateWebhooks: Webhook[];
}

export interface WebhooksViewDispatchProperties {
    dispatchRemoveEntity: typeof actions.data.removeEntity;
    dispatchViewSetEditID: typeof actions.view.setEditID;
}

export type WebhooksViewProperties = WebhooksViewOwnProperties
    & WebhooksViewStateProperties
    & WebhooksViewDispatchProperties;

const WebhooksView: React.FC<WebhooksViewProperties> = (
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
        stateWebhooks,
        // #endregion state

        // #region dispatch
        dispatchRemoveEntity,
        dispatchViewSetEditID,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region handlers
    const handleWebhookEdit = (
        id: string,
    ) => {
        dispatchViewSetEditID({
            type: 'webhook',
            value: id,
        });
        setGeneralView('setup-webhook');
    }

    const handleWebhookObliterate = async (
        id: string,
    ) => {
        try {
            dispatchRemoveEntity({
                type: 'webhook',
                id,
            });

            const input = {
                value: id,
            };

            await client.mutate({
                mutation: OBLITERATE_WEBHOOK,
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
        createSearchTerms(stateWebhooks),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateWebhooks.map(
            webhook => webhookRowRenderer(
                webhook,
                handleWebhookEdit,
                handleWebhookObliterate,
            ),
        ),
    );
    // #endregion state


    // #region handlers
    const filterUpdate = (
        rawValue: string,
    ) => {
        const value = rawValue.toLowerCase();

        const filterIDs = getFilterIDs(
            searchTerms,
            value,
        );

        const filteredWebhooks = stateWebhooks.filter(stateWebhook => {
            if (filterIDs.includes(stateWebhook.id)) {
                return true;
            }

            return false;
        });

        const sortedWebhooks = filteredWebhooks.sort(
            compareValues('path'),
        );

        setFilteredRows(
            sortedWebhooks.map(
                webhook => webhookRowRenderer(
                    webhook,
                    handleWebhookEdit,
                    handleWebhookObliterate,
                ),
            ),
        );
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        const searchTerms = createSearchTerms(
            stateWebhooks,
        );
        const filteredRows = stateWebhooks.map(
            webhook => webhookRowRenderer(
                webhook,
                handleWebhookEdit,
                handleWebhookObliterate,
            ),
        );

        setSearchTerms(searchTerms);
        setFilteredRows(filteredRows);
    }, [
        stateWebhooks,
    ]);
    // #endregion effects


    // #region render
    const rowsHeader = (
        <>
            <div>
                path
            </div>

            <div>
                provider
            </div>

            <div />

            <div />
        </>
    );

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="auto 120px 30px 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no webhooks"

            actionButtonText="Setup Webhook"
            actionButtonClick={() => {
                setGeneralView('setup-webhook');
            }}

            filterUpdate={filterUpdate}
        />
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): WebhooksViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateWebhooks: selectors.data.getWebhooks(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): WebhooksViewDispatchProperties => ({
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


const ConnectedWebhooksView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(WebhooksView);
// #endregion module



// #region exports
export default ConnectedWebhooksView;
// #endregion exports
