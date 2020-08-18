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
    ADD_PROVIDER,
} from '#kernel-services/graphql/mutate';

import {
    StyledPluridTextline,
    StyledPluridPureButton,
    StyledPluridLinkButton,
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
    action: (
        providerID: string,
    ) => void;

    /** optional */
    /** - values */
    /** - methods */
    cancel?: () => void;
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
        cancel,
    } = properties;


    /** state */
    const [
        providerType,
        setProviderType,
    ] = useState('github');
    const [
        providerName,
        setProviderName,
    ] = useState('');
    const [
        providerToken,
        setProviderToken,
    ] = useState('');
    const [
        validProvider,
        setValidProvider,
    ] = useState(false);


    /** handlers */
    const setProvider = async () => {
        if (!validProvider) {
            return;
        }

        const input = {
            type: providerType,
            token: providerToken,
            name: providerName,
        };

        const mutation = await client.mutate({
            mutation: ADD_PROVIDER,
            variables: {
                input,
            },
        });

        const reponse = mutation.data.addProvider;

        if (!reponse.status) {
            return;
        }

        const {
            data,
        } = reponse;

        return data;
    }


    /** effects */
    useEffect(() => {
        if (
            providerType
            && providerToken
            && providerName
        ) {
            setValidProvider(true)
        } else {
            setValidProvider(false);
        }
    }, [
        providerType,
        providerToken,
        providerName,
    ]);


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
                    selectedProvider={providerType}
                    setSelectedProvider={setProviderType}
                />

                <div>
                    <StyledPluridTextline
                        text={providerName}
                        atChange={(event) => setProviderName(event.target.value)}
                        placeholder="name"
                        spellCheck={false}
                        autoCapitalize="false"
                        autoComplete="false"
                        autoCorrect="false"
                        theme={theme}
                        level={2}
                    />
                </div>

                <div>
                    <StyledPluridTextline
                        text={providerToken}
                        atChange={(event) => setProviderToken(event.target.value)}
                        placeholder="token"
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
                        text="Set Provider"
                        atClick={async () => {
                            const providerID = await setProvider();
                            action(providerID);
                        }}
                        disabled={!validProvider}
                        theme={theme}
                        level={2}
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
        </StyledProvider>
    );
}


export default Provider;
/** [END] component */
