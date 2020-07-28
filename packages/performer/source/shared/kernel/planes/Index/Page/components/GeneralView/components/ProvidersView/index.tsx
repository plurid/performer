/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
import {
    ClientProvider,
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
    data: ClientProvider[];
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
                add provider
            </div>

            <div>
                <ul>
                    {data.map(provider => {
                        const {
                            id,
                            name,
                            type,
                        } = provider;

                        return (
                            <li
                                key={id}
                            >
                                {name} ({type})
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
