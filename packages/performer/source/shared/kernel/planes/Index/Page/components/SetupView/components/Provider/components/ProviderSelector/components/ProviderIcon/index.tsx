/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

/** external */
/** internal */
import {
    StyledProviderIcon,
} from './styled';
/** [END] imports */



/** [START] component */
export interface ProviderIconProperties {
    /** required */
    /** - values */
    theme: Theme;
    type: string;
    image: string;
    name: string;
    selectedProvider: string;
    /** - methods */
    setSelecterProvider: React.Dispatch<React.SetStateAction<string>>;

    /** optional */
    /** - values */
    /** - methods */
}

const ProviderIcon: React.FC<ProviderIconProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        type,
        image,
        name,
        selectedProvider,
        /** - methods */
        setSelecterProvider,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** render */
    return (
        <StyledProviderIcon
            theme={theme}
            selected={selectedProvider === type}
            onClick={() => {
                if (selectedProvider !== type) {
                    setSelecterProvider(type)
                } else {
                    setSelecterProvider('');
                }
            }}
        >
            <div>
                <img
                    src={image}
                    alt={name}
                    height={90}
                />
            </div>

            <div>
                <h2
                    style={{
                        margin: '0',
                        marginTop: '15px',
                    }}
                >
                    {name}
                </h2>
            </div>
        </StyledProviderIcon>
    );
}


export default ProviderIcon;
/** [END] component */
