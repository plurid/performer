/** [START] imports */
/** libraries */
import React, {
    useState,
    useEffect,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
import client from '#kernel-services/graphql/client';
import {
    SETUP_WEBHOOK,
} from '#kernel-services/graphql/mutate';

import {
    StyledPluridTextline,
    StyledPluridPureButton,
    StyledPluridLinkButton,
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
    editID?: string;
    /** - methods */
    cancel?: () => void;
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
        editID,
        /** - methods */
        cancel,
    } = properties;


    /** state */
    const [
        webhookPath,
        setWebhookPath,
    ] = useState('');


    /** handle */
    const updateWebhook = async () => {

    }

    const setWebhook = async () => {
        if (!webhookPath || !providerID) {
            return;
        }

        if (editID) {
            await updateWebhook();
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


    /** effects */
    useEffect(() => {
        if (editID) {
            // get webhook data
            // and setWebhookPath
        }
    }, [
        editID,
    ]);


    /** render */
    return (
        <StyledWebhook
            theme={theme}
        >
            <div>
                <h1>
                    {editID ? 'update' : 'generate'} webhook
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
                        text={editID ? 'Update Webhook' : 'Generate Webhook'}
                        atClick={() => {
                            action();
                            setWebhook();
                        }}
                        level={2}
                        disabled={!webhookPath}
                    />
                </div>

                {cancel && (
                    <div>
                        <StyledPluridLinkButton
                            text="cancel"
                            atClick={() => cancel()}
                            theme={theme}
                            level={2}
                        />
                    </div>
                )}
            </div>
        </StyledWebhook>
    );
}


export default Webhook;
/** [END] component */
