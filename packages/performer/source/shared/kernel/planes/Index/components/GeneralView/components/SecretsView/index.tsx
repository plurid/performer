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


/** external */
import {
    compareValues,
} from '#server/utilities/general';

import {
    Secret,
} from '#server/data/interfaces';

import EntityView from '#kernel-components/EntityView';

import client from '#kernel-services/graphql/client';
import {
    OBLITERATE_SECRET,
} from '#kernel-services/graphql/mutate';

import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
import actions from '#kernel-services/state/actions';

import {
    getFilterIDs,
} from '#kernel-services/utilities';

/** internal */
/** [END] imports */



const secretRowRenderer = (
    secret: Secret,
    handleSecretObliterate: (
        id: string,
    ) => void,
) => {
    const {
        id,
        name,
        project,
        startsWith,
    } = secret;

    return (
        <>
            <div>
                {name}
            </div>

            <div>
                {startsWith}
            </div>

            <div>
                {project}
            </div>

            <PluridIconDelete
                atClick={() => handleSecretObliterate(id)}
            />
        </>
    );
}


const createSearchTerms = (
    secrets: Secret[],
) => {
    const searchTerms = secrets.map(
        secret => {
            const {
                id,
                name,
                project,
            } = secret;

            const searchTerm = {
                id,
                data: [
                    name.toLowerCase(),
                    project.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}


/** [START] component */
export interface SecretsViewOwnProperties {
    /** required */
    /** - values */
    /** - methods */
    setGeneralView: any;

    /** optional */
    /** - values */
    /** - methods */
}

export interface SecretsViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateSecrets: Secret[];
}

export interface SecretsViewDispatchProperties {
    dispatchRemoveEntity: typeof actions.data.removeEntity;
}

export type SecretsViewProperties = SecretsViewOwnProperties
    & SecretsViewStateProperties
    & SecretsViewDispatchProperties;

const SecretsView: React.FC<SecretsViewProperties> = (
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
        stateSecrets,

        /** dispatch */
        dispatchRemoveEntity,
    } = properties;


    /** handlers */
    const handleSecretObliterate = async (
        id: string,
    ) => {
        try {
            dispatchRemoveEntity({
                type: 'secret',
                id,
            });

            const input = {
                value: id,
            };

            await client.mutate({
                mutation: OBLITERATE_SECRET,
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
        createSearchTerms(stateSecrets),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateSecrets.map(
            secret => secretRowRenderer(
                secret,
                handleSecretObliterate,
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

        const filteredSecrets = stateSecrets.filter(stateSecret => {
            if (filterIDs.includes(stateSecret.id)) {
                return true;
            }

            return false;
        });

        const sortedSecrets = filteredSecrets.sort(
            compareValues('name'),
        );

        setFilteredRows(
            sortedSecrets.map(
                secret => secretRowRenderer(
                    secret,
                    handleSecretObliterate,
                ),
            ),
        );
    }


    /** effects */
    useEffect(() => {
        const searchTerms = createSearchTerms(
            stateSecrets,
        );
        const filteredRows = stateSecrets.map(
            secret => secretRowRenderer(
                secret,
                handleSecretObliterate,
            ),
        );

        setSearchTerms(searchTerms);
        setFilteredRows(filteredRows);
    }, [
        stateSecrets,
    ]);


    /** render */
    const rowsHeader = (
        <>
            <div>
                name
            </div>

            <div>
                starts with
            </div>

            <div>
                project
            </div>

            <div />
        </>
    );

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="auto 100px 200px 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no secrets"

            actionButtonText="Store Secret"
            actionButtonClick={() => {
                setGeneralView('store-secret');
            }}

            filterUpdate={filterUpdate}
        />
    );
}


const mapStateToProperties = (
    state: AppState,
): SecretsViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateSecrets: selectors.data.getSecrets(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): SecretsViewDispatchProperties => ({
    dispatchRemoveEntity: (
        payload,
    ) => dispatch (
        actions.data.removeEntity(payload),
    ),
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(SecretsView);
/** [END] component */
