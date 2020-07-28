/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
import {
    Webhook,
} from '#server/data/interfaces';


/** internal */
import {
    StyledWebhooksView,
} from './styled';
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
        data,
        /** - methods */

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** render */
    return (
        <StyledWebhooksView
            theme={generalTheme}
        >
            <div>
                add webhook
            </div>

            <div>
                <ul>
                    {data.map(webhook => {
                        const {
                            id,
                            path,
                            provider
                        } = webhook;

                        return (
                            <li
                                key={id}
                            >
                                {path} ({provider})
                            </li>
                        );
                    })}
                </ul>
            </div>
        </StyledWebhooksView>
    );
}


export default WebhooksView;
/** [END] component */
