/** [START] imports */
/** libraries */
import React from 'react';

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

/** internal */
/** [END] imports */



/** [START] component */
export interface RepositoriesViewOwnProperties {
    /** required */
    /** - values */
    /** - methods */

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


    /** render */
    const rowsHeader = (
        <>
            <div>
                name
            </div>

            <div />
        </>
    );

    const rows = stateRepositories.map(repository => {
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
    });

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="4fr 30px"
            rowsHeader={rowsHeader}
            rows={rows}
            noRows="no repositories"

            actionButtonText="Link Repositories"
            actionButtonClick={() => {}}
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
