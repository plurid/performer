/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
import {
    Build,
} from '#server/data/interfaces';


/** internal */
import {
    StyledProvidersView,
} from './styled';
/** [END] imports */



/** [START] component */
export interface ProvidersViewProperties {
    /** required */
    /** - values */
    generalTheme: Theme;
    interactionTheme: Theme;
    data: Build[];
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

const ProvidersView: React.FC<ProvidersViewProperties> = (
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
        <StyledProvidersView
            theme={generalTheme}
        >
            <div>
                <ul>
                    {data.map(build => {
                        const {
                            id,
                        } = build;

                        return (
                            <li
                                key={id}
                            >
                                status - trigger - running time - running date - open
                            </li>
                        );
                    })}
                </ul>
            </div>
        </StyledProvidersView>
    );
}


export default ProvidersView;
/** [END] component */
