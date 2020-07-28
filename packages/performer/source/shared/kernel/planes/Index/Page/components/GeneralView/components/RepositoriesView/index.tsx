/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
import {
    Repository,
} from '#server/data/interfaces';


/** internal */
import {
    StyledRepositoriesView,
} from './styled';
/** [END] imports */



/** [START] component */
export interface RepositoriesViewProperties {
    /** required */
    /** - values */
    generalTheme: Theme;
    interactionTheme: Theme;
    data: Repository[];
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

const RepositoriesView: React.FC<RepositoriesViewProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        generalTheme,
        data,
        /** - methods */

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** render */
    return (
        <StyledRepositoriesView
            theme={generalTheme}
        >
            <div>
                link repositories
            </div>

            <div>
                <ul>
                    {data.map(repository => {
                        const {
                            id,
                            name,
                        } = repository;

                        return (
                            <li
                                key={id}
                            >
                                {name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </StyledRepositoriesView>
    );
}


export default RepositoriesView;
/** [END] component */
