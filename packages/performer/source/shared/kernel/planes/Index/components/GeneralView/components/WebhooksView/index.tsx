/** [START] imports */
/** libraries */
import React from 'react';

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

/** internal */
/** [END] imports */



/** [START] component */
export interface WebhooksViewProperties {
    /** required */
    /** - values */
    generalTheme: Theme;
    interactionTheme: Theme;
    data: Webhook[];
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

const WebhooksView: React.FC<WebhooksViewProperties> = (
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


    /** handlers */
    const handleObliterateWebhook = async (
        id: string,
    ) => {
        try {
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

    const rows = data.map(webhook => {
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
            generalTheme={generalTheme}
            interactionTheme={interactionTheme}

            rowTemplate="2fr 1fr 30px 30px"
            rowsHeader={rowsHeader}
            rows={rows}

            actionButtonText="Add Webhook"
            actionButtonClick={() => {}}
        />
    );
}


export default WebhooksView;
/** [END] component */
