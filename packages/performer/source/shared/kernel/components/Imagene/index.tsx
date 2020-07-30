/** [START] imports */
/** libraries */
import React, {
    useState,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
// import client from '#kernel-services/graphql/client';
// import {
// } from '#kernel-services/graphql/mutate';

import {
    StyledPluridTextline,
    StyledPluridPureButton,
    StyledPluridLinkButton,
} from '#kernel-services/styled';


/** internal */
import {
    StyledImagene,
} from './styled';
/** [END] imports */



/** [START] component */
export interface ImageneProperties {
    /** required */
    /** - values */
    theme: Theme;
    providerID: string;
    /** - methods */
    action: () => void;

    /** optional */
    /** - values */
    /** - methods */
    cancel?: () => void;
}

const Imagene: React.FC<ImageneProperties> = (
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
        cancel,
    } = properties;


    /** state */
    const [
        imageneName,
        setImageneName,
    ] = useState('');


    /** handle */
    const addImagene = async () => {
        if (!imageneName) {
            return;
        }

        // const input = {
        //     value: imageneName,
        // };

        // const mutation = await client.mutate({
        //     mutation: ADD_IMAGENE,
        //     variables: {
        //         input,
        //     },
        // });
        // console.log('mutation', mutation);
    }


    /** render */
    return (
        <StyledImagene
            theme={theme}
        >
            <div>
                <h1>
                    add imagene
                </h1>

                <div>
                    <StyledPluridTextline
                        text={imageneName}
                        placeholder="name"
                        atChange={(event) => setImageneName(event.target.value)}
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
                        text="Add Imagene"
                        atClick={() => {
                            action();
                            addImagene();
                        }}
                        level={2}
                        disabled={!imageneName}
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
        </StyledImagene>
    );
}


export default Imagene;
/** [END] component */
