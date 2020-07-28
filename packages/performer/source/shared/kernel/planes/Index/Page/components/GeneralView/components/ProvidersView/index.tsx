/** [START] imports */
/** libraries */
import React, {
    useState,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridTextline,
    PluridPureButton,
} from '@plurid/plurid-ui-react';

import {
    PluridIconDelete,
} from '@plurid/plurid-icons-react';


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


    /** state */
    const [
        searchValue,
        setSearchValue,
    ] = useState('');


    /** render */
    return (
        <StyledProvidersView
            theme={generalTheme}
        >
            <PluridTextline
                text={searchValue}
                placeholder="search"
                atChange={(event) => setSearchValue(event.target.value)}
                theme={interactionTheme}
                level={2}
                style={{
                    width: '300px',
                    marginBottom: '30px',
                }}
            />

            <StyledProvidersList>
                <ul>
                    <StyledProvidersListItem>
                        <div>
                            name
                        </div>

                        <div>
                            type
                        </div>

                        <div />
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

                                <PluridIconDelete />
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
