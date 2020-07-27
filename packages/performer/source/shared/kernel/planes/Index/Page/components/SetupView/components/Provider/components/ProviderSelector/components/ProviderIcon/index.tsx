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
    image: string;
    name: string;
    /** - methods */

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
        image,
        name,
        /** - methods */

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** render */
    return (
        <StyledProviderIcon
            theme={theme}
        >
            <div>
                <img
                    src={image}
                    alt={name}
                    height={90}
                />
            </div>
            <div>
                <h2>
                    {name}
                </h2>
            </div>
        </StyledProviderIcon>
    );
}


export default ProviderIcon;
/** [END] component */
