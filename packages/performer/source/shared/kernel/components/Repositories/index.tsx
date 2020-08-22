// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        PluridSpinner,
    } from '@plurid/plurid-ui-react';
    // #endregion libraries


    // #region external
    import client from '#kernel-services/graphql/client';
    import {
        GET_PROVIDER_REPOSITORIES,
    } from '#kernel-services/graphql/query';
    import {
        LINK_REPOSITORY,
    } from '#kernel-services/graphql/mutate';

    import {
        StyledPluridPureButton,
        StyledPluridLinkButton,
    } from '#kernel-services/styled';

    import {
        Repository as IRepository,
    } from '#server/data/interfaces';
    // #endregion external


    // #region internal
    import RepositoryItem from './components/RepositoryItem';

    import {
        StyledRepository,
        StyledNoRepositories,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface RepositoryProperties {
    // #region required
        // #region values
        theme: Theme;
        providerID: string;
        // #endregion values

        // #region methods
        action: () => void;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        cancel?: () => void;
        // #endregion methods
    // #endregion optional
}

const Repository: React.FC<RepositoryProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            theme,
            providerID,
            // #endregion values

            // #region methods
            action,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            cancel,
            // #endregion methods
        // #endregion optional
    } = properties;
    // #endregion properties


    // #region state
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
    // #endregion state


    // #region handlers
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

            const response = await client.mutate({
                mutation: LINK_REPOSITORY,
                variables: {
                    input,
                },
            });

            console.log(response);
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
    // #endregion handlers


    // #region effects
    useEffect(() => {
        const getProviderRepositories = async () => {
            try {
                if (!providerID) {
                    return;
                }

                const input = {
                    value: providerID,
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
    // #endregion effects


    // #region render
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

                {!loading
                && providerRepositories.length === 0
                && (
                    <StyledNoRepositories>
                        no repositories
                    </StyledNoRepositories>
                )}

                {!loading
                && providerRepositories.length > 0
                && (
                    <>
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
                    </>
                )}

                {!loading
                && cancel
                && (
                    <div>
                        <StyledPluridLinkButton
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
    // #endregion render
}
// #endregion module



// #region exports
export default Repository;
// #endregion exports
