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
        STORE_SECRET,
    } from '#kernel-services/graphql/mutate';

    import {
        StyledPluridTextline,
        StyledPluridPureButton,
        StyledPluridLinkButton,
    } from '#kernel-services/styled';
    // #endregion external


    // #region internal
    import {
        StyledSecret,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface SecretProperties {
    // #region required
        // #region values
        theme: Theme;
        // #endregion values

        // #region methods
        action: () => void;
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

const Secret: React.FC<SecretProperties> = (
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
        secretName,
        setSecretName,
    ] = useState('');
    const [
        secretValue,
        setSecretValue,
    ] = useState('');
    const [
        secretProject,
        setSecretProject,
    ] = useState('');
    const [
        validSecret,
        setValidSecret,
    ] = useState(false);
    // #endregion state


    // #region handlers
    const storeSecret = async () => {
        if (!validSecret) {
            return;
        }

        const input = {
            name: secretName,
            value: secretValue,
            project: secretProject,
        };

        await client.mutate({
            mutation: STORE_SECRET,
            variables: {
                input,
            },
        });
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        if (
            !secretName
            || !secretValue
            || !secretProject
        ) {
            setValidSecret(false);
        } else {
            setValidSecret(true);
        }
    }, [
        secretName,
        secretValue,
        secretProject,
    ]);
    // #endregion effects


    // #region render
    return (
        <StyledSecret
            theme={theme}
        >
            <div>
                <h1>
                    store secret
                </h1>

                <div>
                    <StyledPluridTextline
                        text={secretName}
                        placeholder="name"
                        atChange={(event) => setSecretName(event.target.value)}
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
                        text={secretValue}
                        placeholder="value"
                        atChange={(event) => setSecretValue(event.target.value)}
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
                        text={secretProject}
                        placeholder="project"
                        atChange={(event) => setSecretProject(event.target.value)}
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
                        text="Store Secret"
                        atClick={() => {
                            action();
                            storeSecret();
                        }}
                        level={2}
                        disabled={!secretName}
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
        </StyledSecret>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Secret;
// #endregion exports
