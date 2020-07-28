/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridPureButton,
} from '@plurid/plurid-ui-react';


/** external */
import {
    ClientProvider,
} from '#server/data/interfaces';


/** internal */
import {
    StyledProvidersView,
    StyledProvidersList,
    StyledProvidersListItem,
    StyledProvidersButton,
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
        interactionTheme,
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
            <StyledProvidersList>
                <ul>
                    <StyledProvidersListItem>
                        <div>
                            name
                        </div>

                        <div>
                            type
                        </div>
                    </StyledProvidersListItem>

                    {data.map(provider => {
                        const {
                            id,
                            name,
                            type,
                        } = provider;

                        return (
                            <StyledProvidersListItem
                                key={id}
                            >
                                <div>
                                    {name}
                                </div>

                                <div>
                                    {type}
                                </div>
                            </StyledProvidersListItem>
                        );
                    })}
                </ul>
            </StyledProvidersList>

            <StyledProvidersButton>
                <PluridPureButton
                    text="Add Provider"
                    atClick={() => {}}
                    theme={interactionTheme}
                    level={2}
                />
            </StyledProvidersButton>
        </StyledProvidersView>
    );
}


export default ProvidersView;
/** [END] component */
