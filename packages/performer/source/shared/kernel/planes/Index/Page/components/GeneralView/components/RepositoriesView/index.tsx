/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridPureButton,
} from '@plurid/plurid-ui-react';

import {
    PluridIconDelete,
} from '@plurid/plurid-icons-react';


/** external */
import {
    Repository,
} from '#server/data/interfaces';


/** internal */
import {
    StyledRepositoriesView,
    StyledRepositoriesList,
    StyledRepositoriesListItem,
    StyledRepositoriesButton,
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
        interactionTheme,
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
            <StyledRepositoriesList>
                <ul>
                    <StyledRepositoriesListItem>
                        <div>
                            name
                        </div>

                        <div />
                    </StyledRepositoriesListItem>

                    {data.map(repository => {
                        const {
                            id,
                            name,
                        } = repository;

                        return (
                            <StyledRepositoriesListItem
                                key={id}
                            >
                                <div>
                                    {name}
                                </div>

                                <PluridIconDelete />
                            </StyledRepositoriesListItem>
                        );
                    })}
                </ul>
            </StyledRepositoriesList>

            <StyledRepositoriesButton>
                <PluridPureButton
                    text="Link Repositories"
                    atClick={() => {}}
                    theme={interactionTheme}
                    level={2}
                />
            </StyledRepositoriesButton>
        </StyledRepositoriesView>
    );
}


export default RepositoriesView;
/** [END] component */
