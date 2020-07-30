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

/** internal */
/** [END] imports */



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
    const handleObliterateWebhook = async (
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

    const rows = stateWebhooks.map(webhook => {
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
                    atClick={() => {}}
                />

                <PluridIconDelete
                    atClick={() => handleObliterateWebhook(id)}
                />
            </>
        );
    });

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="2fr 1fr 30px 30px"
            rowsHeader={rowsHeader}
            rows={rows}
            noRows="no webhooks"

            actionButtonText="Add Webhook"
            actionButtonClick={() => {
                setGeneralView('add-webhook');
            }}
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
