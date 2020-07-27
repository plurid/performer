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
    StyledProvider,
} from './styled';
/** [END] imports */



/** [START] component */
export interface ProviderProperties {
    /** required */
    /** - values */
    theme: Theme;
    /** - methods */
    setPhase: React.Dispatch<React.SetStateAction<string>>;

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
        setPhase,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** state */
    const [
        providerToken,
        setProviderToken,
    ] = useState('');


    /** render */
    return (
        <StyledProvider
            theme={theme}
        >
            <div>
                <h1>
                    setup provider
                </h1>

                <div>
                    <div>
                        github
                    </div>

                    <div>
                        bitbucket
                    </div>
                </div>

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
                            setPhase('REPOSITORY');
                        }}
                        level={2}
                    />
                </div>
            </div>
        </StyledProvider>
    );
}


export default Provider;
/** [END] component */
