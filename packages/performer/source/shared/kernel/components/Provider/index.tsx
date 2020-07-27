/** [START] imports */
/** libraries */
import React, {
    useState,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
import client from '#kernel-services/graphql/client';
import {
    SETUP_PROVIDER,
} from '#kernel-services/graphql/mutate';

import {
    StyledPluridTextline,
    StyledPluridPureButton,
} from '#kernel-services/styled';


/** internal */
import ProviderSelector from './components/ProviderSelector';

import {
    StyledProvider,
} from './styled';
/** [END] imports */



/** [START] component */
export interface ProviderProperties {
    /** required */
    /** - values */
    theme: Theme;
    /** - methods */
    action: () => void;

    /** optional */
    /** - values */
    /** - methods */
}

const Provider: React.FC<ProviderProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        /** - methods */
        action,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** state */
    const [
        selectedProvider,
        setSelectedProvider,
    ] = useState('');
    const [
        providerToken,
        setProviderToken,
    ] = useState('');


    /** handlers */
    const setProvider = async () => {
        if (!providerToken || !selectedProvider) {
            return;
        }

        const input = {
            token: providerToken,
            provider: selectedProvider,
        };

        const mutation = await client.mutate({
            mutation: SETUP_PROVIDER,
            variables: {
                input,
            },
        });
        console.log('mutation', mutation);
    }


    /** render */
    return (
        <StyledProvider
            theme={theme}
        >
            <div>
                <h1>
                    setup provider
                </h1>

                <ProviderSelector
                    theme={theme}
                    selectedProvider={selectedProvider}
                    setSelectedProvider={setSelectedProvider}
                />

                <div>
                    <StyledPluridTextline
                        text={providerToken}
                        placeholder="token"
                        atChange={(event) => setProviderToken(event.target.value)}
                        level={2}
                    />
                </div>

                <div>
                    <StyledPluridPureButton
                        text="Set Provider"
                        atClick={() => {
                            setProvider();
                            action();
                        }}
                        level={2}
                        disabled={
                            !selectedProvider
                            || !providerToken
                        }
                    />
                </div>
            </div>
        </StyledProvider>
    );
}


export default Provider;
/** [END] component */
