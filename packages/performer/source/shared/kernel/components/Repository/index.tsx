/** [START] imports */
/** libraries */
import React, {
    useState,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
import client from '#kernel-services/graphql/client';
import {
    LINK_REPOSITORY,
} from '#kernel-services/graphql/mutate';

import {
    StyledPluridPureButton,
} from '#kernel-services/styled';


/** internal */
import RepositoryItem from './components/RepositoryItem';

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
    action: () => void;

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
        action,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** state */
    const [
        selectedRepositories,
        setSelectedRepositories,
    ] = useState<string[]>([]);


    /** handlers */
    const linkRepositories = async () => {
        if (selectedRepositories.length === 0) {
            return;
        }

        for (const selectedRepository of selectedRepositories) {
            const input = {
                url: '',
                name: selectedRepository,
            };

            const mutation = await client.mutate({
                mutation: LINK_REPOSITORY,
                variables: {
                    input,
                },
            });
            console.log('mutation', mutation);
        }
    }


    /** render */
    return (
        <StyledRepository
            theme={theme}
        >
            <div>
                <h1>
                    link repositories
                </h1>

                <ul>
                    <RepositoryItem
                        theme={theme}
                        select={() => {}}
                    />

                    <RepositoryItem
                        theme={theme}
                        select={() => {}}
                    />
                </ul>

                <div>
                    <StyledPluridPureButton
                        text="Link Repositories"
                        atClick={() => {
                            action();
                            // linkRepositories();
                        }}
                        level={2}
                        // disabled={selectedRepositories.length === 0}
                    />
                </div>
            </div>
        </StyledRepository>
    );
}


export default Repository;
/** [END] component */
