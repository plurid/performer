// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        STORE_SECRET,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        Secret as ISecret,
    } from '#server/data/interfaces';

    import {
        addEntityMutation,
    } from '#kernel-services/logic/mutations';

    import {
        PluridInputLine,
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
        action: (
            secret: ISecret,
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

        const secret: ISecret | undefined = await addEntityMutation(
            {
                name: secretName,
                value: secretValue,
                project: secretProject,
            },
            STORE_SECRET,
            'storeSecret',
        );

        if (secret) {
            action(secret);
        }
    }

    const handleEnter = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            storeSecret();
        }
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
            <h1>
                store secret
            </h1>

            <PluridInputLine
                text={secretName}
                name="name"
                atChange={(event) => setSecretName(event.target.value)}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <PluridInputLine
                text={secretValue}
                name="value"
                atChange={(event) => setSecretValue(event.target.value)}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <PluridInputLine
                text={secretProject}
                name="project"
                atChange={(event) => setSecretProject(event.target.value)}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <StyledPluridPureButton
                text="Store Secret"
                atClick={() => storeSecret()}
                level={2}
                disabled={!secretName}
            />

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
        </StyledSecret>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Secret;
// #endregion exports
