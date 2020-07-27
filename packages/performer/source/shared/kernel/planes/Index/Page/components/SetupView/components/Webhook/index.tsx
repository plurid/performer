/** [START] imports */
/** libraries */
import React, {
    useState,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
import {
    StyledPluridTextline,
    StyledPluridPureButton,
} from '../../styled';


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
    /** - methods */
    setPhase: React.Dispatch<React.SetStateAction<string>>;

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
        /** - methods */
        setPhase,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** state */
    const [webhookPath, setWebhookPath] = useState('');


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
                        placeholder="path"
                        atChange={(event) => setWebhookPath(event.target.value)}
                        level={2}
                    />
                </div>

                <div>
                    <StyledPluridPureButton
                        text="Setup Webhook"
                        atClick={() => {
                            setPhase('TRIGGER');
                        }}
                        level={2}
                    />
                </div>
            </div>
        </StyledWebhook>
    );
}


export default Webhook;
/** [END] component */
