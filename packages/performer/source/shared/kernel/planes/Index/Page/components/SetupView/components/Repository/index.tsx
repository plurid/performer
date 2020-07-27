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
    StyledRepository,
} from './styled';
/** [END] imports */



/** [START] component */
export interface RepositoryProperties {
    /** required */
    /** - values */
    theme: Theme;
    /** - methods */
    setPhase: React.Dispatch<React.SetStateAction<string>>;

    /** optional */
    /** - values */
    /** - methods */
}

const Repository: React.FC<RepositoryProperties> = (
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


    /** render */
    return (
        <StyledRepository
            theme={theme}
        >
            <div>
                <h1>
                    link repositories
                </h1>

                <div>
                    select from list
                </div>

                <ul>
                    <li>
                        repo 1
                    </li>
                    <li>
                        repo 2
                    </li>
                </ul>

                <div>
                    <StyledPluridPureButton
                        text="Link Repositories"
                        atClick={() => {
                            setPhase('WEBHOOK');
                        }}
                        level={2}
                    />
                </div>
            </div>
        </StyledRepository>
    );
}


export default Repository;
/** [END] component */
