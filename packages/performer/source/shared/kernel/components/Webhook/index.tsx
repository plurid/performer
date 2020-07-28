/** [START] imports */
/** libraries */
import React, {
    useState,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridFormLeftRight,
    PluridDropdown,
} from '@plurid/plurid-ui-react';


/** external */
import client from '#kernel-services/graphql/client';
import {
    SETUP_WEBHOOK,
} from '#kernel-services/graphql/mutate';

import {
    StyledPluridTextline,
    StyledPluridPureButton,
} from '#kernel-services/styled';


/** internal */
import {
    StyledWebhook,
} from './styled';
/** [END] imports */



/** [START] component */
export interface WebhookProperties {
    /** required */
    /** - values */
    theme: Theme;
    providerID: string;
    /** - methods */
    action: () => void;

    /** optional */
    /** - values */
    /** - methods */
}

const Webhook: React.FC<WebhookProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        providerID,
        /** - methods */
        action,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** state */
    const [
        webhookPath,
        setWebhookPath,
    ] = useState('');


    /** handle */
    const setWebhook = async () => {
        if (!webhookPath || !providerID) {
            return;
        }

        const input = {
            providerID,
            path: webhookPath,
        };

        const mutation = await client.mutate({
            mutation: SETUP_WEBHOOK,
            variables: {
                input,
            },
        });
        console.log('mutation', mutation);
    }


    /** render */
    return (
        <StyledWebhook
            theme={theme}
        >
            <div>
                <h1>
                    setup webhook
                </h1>

                <div>
                    <StyledPluridTextline
                        text={webhookPath}
                        placeholder="/path/to/webhook"
                        atChange={(event) => setWebhookPath(event.target.value)}
                        spellCheck={false}
                        autoCapitalize="false"
                        autoComplete="false"
                        autoCorrect="false"
                        theme={theme}
                        level={2}
                    />
                </div>

                <div>
                    <StyledPluridPureButton
                        text="Setup Webhook"
                        atClick={() => {
                            action();
                            setWebhook();
                        }}
                        level={2}
                        disabled={!webhookPath}
                    />
                </div>
            </div>
        </StyledWebhook>
    );
}


export default Webhook;
/** [END] component */
