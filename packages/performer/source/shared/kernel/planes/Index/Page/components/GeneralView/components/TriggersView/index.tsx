/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
import {
    Trigger,
} from '#server/data/interfaces';


/** internal */
import {
    StyledTriggersView,
} from './styled';
/** [END] imports */



/** [START] component */
export interface TriggersViewProperties {
    /** required */
    /** - values */
    generalTheme: Theme;
    interactionTheme: Theme;
    data: Trigger[];
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

const TriggersView: React.FC<TriggersViewProperties> = (
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
        <StyledTriggersView
            theme={generalTheme}
        >
            <div>
                add trigger
            </div>

            <div>
                <ul>
                    {data.map(trigger => {
                        const {
                            id,
                            name,
                            repository,
                            branch,
                            path,
                        } = trigger;

                        return (
                            <li
                                key={id}
                            >
                                {name} - {repository} - {branch} - {path}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </StyledTriggersView>
    );
}


export default TriggersView;
/** [END] component */
