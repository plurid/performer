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
// import {
//     ADD_SECRET,
// } from '#kernel-services/graphql/mutate';

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
        secretPath,
        setSecretPath,
    ] = useState('');


    /** handle */
    const setSecret = async () => {
        if (!secretPath) {
            return;
        }

        const input = {
            path: secretPath,
        };

        // const mutation = await client.mutate({
        //     mutation: ADD_SECRET,
        //     variables: {
        //         input,
        //     },
        // });
    }


    /** render */
    return (
        <StyledSecret
            theme={theme}
        >
            <div>
                <h1>
                    add secret
                </h1>

                <div>
                    <StyledPluridTextline
                        text={secretPath}
                        placeholder="name"
                        atChange={(event) => setSecretPath(event.target.value)}
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
                        text={secretPath}
                        placeholder="value"
                        atChange={(event) => setSecretPath(event.target.value)}
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
                        text="Add Secret"
                        atClick={() => {
                            action();
                            setSecret();
                        }}
                        level={2}
                        disabled={!secretPath}
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
