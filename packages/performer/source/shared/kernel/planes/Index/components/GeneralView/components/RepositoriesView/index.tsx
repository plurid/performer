/** [START] imports */
/** libraries */
import React, {
    useState,
    useEffect,
} from 'react';

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconDelete,
} from '@plurid/plurid-icons-react';

import {
    PluridLinkButton,
} from '@plurid/plurid-ui-react';


/** external */
import {
    compareValues,
} from '#server/utilities';

import {
    Repository,
} from '#server/data/interfaces';

import EntityView from '#kernel-components/EntityView';

import client from '#kernel-services/graphql/client';
import {
    UNLINK_REPOSITORY,
} from '#kernel-services/graphql/mutate';

import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
import actions from '#kernel-services/state/actions';

import {
    getFilterIDs,
} from '#kernel-services/utilities';

/** internal */
/** [END] imports */



const repositoryRowRenderer = (
    repository: Repository,
    unlinkRepository: any,
) => {
    const {
        id,
        name,
    } = repository;

    return (
        <>
            <div>
                <PluridLinkButton
                    text={name}
                    atClick={() => {}}
                    inline={true}
                    style={{
                        border: 'none',
                        fontWeight: 'normal',
                    }}
                />
            </div>

            <PluridIconDelete
                atClick={() => unlinkRepository(id)}
            />
        </>
    );
}


const createSearchTerms = (
    repositories: Repository[],
) => {
    const searchTerms = repositories.map(
        repository => {
            const {
                id,
                name,
            } = repository;

            const searchTerm = {
                id,
                data: [
                    name.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}


/** [START] component */
export interface RepositoriesViewOwnProperties {
    /** required */
    /** - values */
    /** - methods */
    setGeneralView: any;

    /** optional */
    /** - values */
    /** - methods */
}

export interface RepositoriesViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateRepositories: Repository[];
}

export interface RepositoriesViewDispatchProperties {
    dispatchRemoveEntity: typeof actions.data.removeEntity;
}

export type RepositoriesViewProperties = RepositoriesViewOwnProperties
    & RepositoriesViewStateProperties
    & RepositoriesViewDispatchProperties;

const RepositoriesView: React.FC<RepositoriesViewProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        /** - methods */
        setGeneralView,

        /** optional */
        /** - values */
        /** - methods */

        /** state */
        stateGeneralTheme,
        stateInteractionTheme,
        stateRepositories,

        /** dispatch */
        dispatchRemoveEntity,
    } = properties;


    /** handlers */
    const unlinkRepository = async (
        id: string,
    ) => {
        try {
            dispatchRemoveEntity({
                type: 'repository',
                id,
            });

            const input = {
                value: id,
            };

            await client.mutate({
                mutation: UNLINK_REPOSITORY,
                variables: {
                    input,
                },
            });
        } catch (error) {
            return;
        }
    }


    /** state */
    const [searchTerms, setSearchTerms] = useState(
        createSearchTerms(stateRepositories),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateRepositories.map(
            repository => repositoryRowRenderer(
                repository,
                unlinkRepository,
            ),
        ),
    );


    /** functions */
    const filterUpdate = (
        rawValue: string,
    ) => {
        const value = rawValue.toLowerCase();

        const filterIDs = getFilterIDs(
            searchTerms,
            value,
        );

        const filteredRepositories = stateRepositories.filter(stateRepository => {
            if (filterIDs.includes(stateRepository.id)) {
                return true;
            }

            return false;
        });

        const sortedRepositories = filteredRepositories.sort(
            compareValues('name'),
        );

        setFilteredRows(
            sortedRepositories.map(
                repository => repositoryRowRenderer(
                    repository,
                    unlinkRepository,
                ),
            ),
        );
    }


    /** effects */
    useEffect(() => {
        const searchTerms = createSearchTerms(
            stateRepositories,
        );
        const filteredRows = stateRepositories.map(
            repository => repositoryRowRenderer(
                repository,
                unlinkRepository,
            ),
        );

        setSearchTerms(searchTerms);
        setFilteredRows(filteredRows);
    }, [
        stateRepositories,
    ]);


    /** render */
    const rowsHeader = (
        <>
            <div>
                name
            </div>

            <div />
        </>
    );

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="4fr 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no repositories"

            actionButtonText="Link Repositories"
            actionButtonClick={() => {
                setGeneralView('link-repositories');
            }}

            filterUpdate={filterUpdate}
        />
    );
}


const mapStateToProperties = (
    state: AppState,
): RepositoriesViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateRepositories: selectors.data.getRepositories(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): RepositoriesViewDispatchProperties => ({
    dispatchRemoveEntity: (
        payload,
    ) => dispatch (
        actions.data.removeEntity(payload),
    ),
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(RepositoriesView);
/** [END] component */
