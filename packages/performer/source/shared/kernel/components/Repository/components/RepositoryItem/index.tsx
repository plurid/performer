/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconValid,
} from '@plurid/plurid-icons-react';


/** external */
/** internal */
import {
    StyledRepositoryItem,
    StyledRepositorySelected,
} from './styled';
/** [END] imports */



/** [START] component */
export interface RepositoryItemProperties {
    /** required */
    /** - values */
    theme: Theme;
    /** - methods */
    select: () => void;

    /** optional */
    /** - values */
    /** - methods */
}

const RepositoryItem: React.FC<RepositoryItemProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        /** - methods */
        select,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** render */
    return (
        <StyledRepositoryItem
            theme={theme}
            onClick={() => select()}
        >
            <StyledRepositorySelected>
                <PluridIconValid />
            </StyledRepositorySelected>

            <div>
                Repository Item
            </div>
        </StyledRepositoryItem>
    );
}


export default RepositoryItem;
/** [END] component */
