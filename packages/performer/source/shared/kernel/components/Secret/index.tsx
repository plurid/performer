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
    STORE_SECRET,
} from '#kernel-services/graphql/mutate';

import {
    StyledPluridTextline,
    StyledPluridPureButton,
    StyledPluridLinkButton,
} from '#kernel-services/styled';


/** internal */
import {
    StyledSecret,
} from './styled';
/** [END] imports */



/** [START] component */
export interface SecretProperties {
    /** required */
    /** - values */
    theme: Theme;
    /** - methods */
    action: () => void;

    /** optional */
    /** - values */
    /** - methods */
    cancel?: () => void;
}

const Secret: React.FC<SecretProperties> = (
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


    /** handle */
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


    /** effects */
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


    /** render */
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
}


export default Secret;
/** [END] component */
