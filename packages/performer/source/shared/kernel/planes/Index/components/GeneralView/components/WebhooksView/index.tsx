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
    PluridIconEdit,
    PluridIconDelete,
} from '@plurid/plurid-icons-react';


/** external */
import {
    compareValues,
} from '#server/utilities';

import {
    Webhook,
} from '#server/data/interfaces';

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

/** internal */
/** [END] imports */




const webhookRowRenderer = (
    webhook: Webhook,
    handleWebhookEdit: (
        id: string,
    ) => void,
    handleWebhookObliterate: (
        id: string,
    ) => void,
) => {
    const {
        id,
        path,
        provider
    } = webhook;

    return (
        <>
            <div>
                {path}
            </div>

            <div>
                {provider}
            </div>

            <PluridIconEdit
                atClick={() => handleWebhookEdit(id)}
            />

            <PluridIconDelete
                atClick={() => handleWebhookObliterate(id)}
            />
        </>
    );
}


const createSearchTerms = (
    webhooks: Webhook[],
) => {
    const searchTerms = webhooks.map(
        webhook => {
            const {
                id,
                path,
                provider
            } = webhook;

            const searchTerm = {
                id,
                data: [
                    path.toLowerCase(),
                    provider.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}


/** [START] component */
export interface WebhooksViewOwnProperties {
    /** required */
    /** - values */
    /** - methods */
    setGeneralView: any;

    /** optional */
    /** - values */
    /** - methods */
}

export interface WebhooksViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateWebhooks: Webhook[];
}

export interface WebhooksViewDispatchProperties {
    dispatchRemoveEntity: typeof actions.data.removeEntity;
}

export type WebhooksViewProperties = WebhooksViewOwnProperties
    & WebhooksViewStateProperties
    & WebhooksViewDispatchProperties;

const WebhooksView: React.FC<WebhooksViewProperties> = (
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
        stateWebhooks,

        /** dispatch */
        dispatchRemoveEntity,
    } = properties;


    /** handlers */
    const handleWebhookEdit = (
        id: string,
    ) => {
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


    /** state */
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


    /** functions */
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


    /** effects */
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


    /** render */
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

            rowTemplate="2fr 1fr 30px 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no webhooks"

            actionButtonText="Add Webhook"
            actionButtonClick={() => {
                setGeneralView('add-webhook');
            }}

            filterUpdate={filterUpdate}
        />
    );
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
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(WebhooksView);
/** [END] component */
