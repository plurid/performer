// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import client from '#kernel-services/graphql/client';
    import {
        ADD_PROVIDER,
    } from '#kernel-services/graphql/mutate';

    import {
        StyledPluridTextline,
        StyledPluridPureButton,
        StyledPluridLinkButton,
    } from '#kernel-services/styled';
    // #endregion external


    // #region internal
    import ProviderSelector from './components/ProviderSelector';

    import {
        StyledProvider,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface ProviderProperties {
    // #region required
        // #region values
        theme: Theme;
        // #endregion values

        // #region methods
        action: (
            providerID: string,
        ) => void;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        cancel?: () => void;
        // #endregion methods
    // #endregion optional
}

const Provider: React.FC<ProviderProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            theme,
            // #endregion values

            // #region methods
            action,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            cancel,
            // #endregion methods
        // #endregion optional
    } = properties;
    // #endregion properties


    // #region state
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
    // #endregion state


    // #region handlers
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
    // #endregion handlers


    // #region effects
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
    // #endregion effects


    // #region render
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
    // #endregion render
}
// #endregion module



// #region exports
export default Provider;
// #endregion exports
