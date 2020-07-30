/** [START] imports */
/** libraries */
import React, {
    useState,
    useEffect,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridSpinner,
    PluridLinkButton,
} from '@plurid/plurid-ui-react';


/** external */
import client from '#kernel-services/graphql/client';
import {
    GET_PROVIDER_REPOSITORIES,
} from '#kernel-services/graphql/query';
import {
    LINK_REPOSITORY,
} from '#kernel-services/graphql/mutate';

import {
    StyledPluridPureButton,
} from '#kernel-services/styled';

import {
    Repository as IRepository,
} from '#server/data/interfaces';


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
    providerID: string;
    /** - methods */
    action: () => void;

    /** optional */
    /** - values */
    /** - methods */
    cancel?: () => void;
}

const Repository: React.FC<RepositoryProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        providerID,
        /** - methods */
        action,

        /** optional */
        /** - values */
        /** - methods */
        cancel,
    } = properties;


    /** state */
    const [
        loading,
        setLoading,
    ] = useState(true);
    const [
        providerRepositories,
        setProviderRepositories,
    ] = useState<IRepository[]>([]);
    const [
        selectedRepositories,
        setSelectedRepositories,
    ] = useState<string[]>([]);


    /** handlers */
    const linkRepositories = async () => {
        if (
            selectedRepositories.length === 0
            || !providerID
        ) {
            return;
        }

        for (const selectedRepository of selectedRepositories) {
            const repository = providerRepositories.find(
                repository => repository.id === selectedRepository,
            );

            if (!repository) {
                continue;
            }

            const {
                name,
            } = repository;

            const input = {
                providerID,
                nameWithOwner: name,
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

    const handleSelect = (
        id: string,
    ) => {
        if (!selectedRepositories.includes(id)) {
            const updated = [
                ...selectedRepositories,
                id,
            ];
            setSelectedRepositories(updated);
            return;
        }

        const updated = selectedRepositories.filter(repository => repository !== id);
        setSelectedRepositories(updated);
        return;
    }


    /** effects */
    useEffect(() => {
        const getProviderRepositories = async () => {
            try {
                if (!providerID) {
                    return;
                }

                const input = {
                    providerID,
                };

                const query = await client.query({
                    query: GET_PROVIDER_REPOSITORIES,
                    variables: {
                        input,
                    },
                });

                const response = query.data.getProviderRepositories;
                if (!response.status) {
                    setLoading(false);
                    return;
                }

                setProviderRepositories(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                return;
            }
        }

        getProviderRepositories();
    }, [
        providerID,
    ]);


    /** render */
    return (
        <StyledRepository
            theme={theme}
        >
            <div>
                <h1>
                    link repositories
                </h1>

                {loading && (
                    <PluridSpinner
                        theme={theme}
                    />
                )}

                {!loading && providerRepositories.length === 0 && (
                    <div>
                        no repositories
                    </div>
                )}

                <ul>
                    {!loading && providerRepositories.map(repository => {
                        const {
                            id,
                        } = repository;

                        return (
                            <RepositoryItem
                                key={id}
                                theme={theme}
                                selected={selectedRepositories.includes(id)}
                                select={handleSelect}
                                data={repository}
                            />
                        );
                    })}
                </ul>

                <div>
                    <StyledPluridPureButton
                        text="Link Repositories"
                        atClick={() => {
                            action();
                            linkRepositories();
                        }}
                        disabled={selectedRepositories.length === 0}
                        theme={theme}
                        level={2}
                    />
                </div>

                {cancel && (
                    <div>
                        <PluridLinkButton
                            text="cancel"
                            atClick={() => cancel()}
                            theme={theme}
                            level={2}
                        />
                    </div>
                )}
            </div>
        </StyledRepository>
    );
}


export default Repository;
/** [END] component */
