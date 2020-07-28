/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconDelete,
} from '@plurid/plurid-icons-react';


/** external */
import {
    Webhook,
} from '#server/data/interfaces';

import EntityView from '#kernel-components/EntityView';

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
        </>
    );

    const rows = data.map(webhook => {
        const {
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

                <PluridIconDelete
                    atClick={() => {}}
                />
            </>
        );
    });

    return (
        <EntityView
            generalTheme={generalTheme}
            interactionTheme={interactionTheme}

            rowTemplate="2fr 1fr 30px"
            rowsHeader={rowsHeader}
            rows={rows}

            actionButtonText="Add Webhook"
            actionButtonClick={() => {}}
        />
    );
}


export default WebhooksView;
/** [END] component */
