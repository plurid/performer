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
} from '#server/utilities';

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
    handleSecretEdit: (
        id: string,
    ) => void,
    handleSecretObliterate: (
        id: string,
    ) => void,
) => {
    const {
        name,
        // project,
    } = secret;

    return (
        <>
            <div>
                {name}
            </div>

            {/* <div>
                {project}
            </div> */}

            <PluridIconDelete
                atClick={() => handleSecretObliterate(name)}
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
                name,
            } = secret;

            const searchTerm = {
                id: name,
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
    const handleSecretEdit = (
        id: string,
    ) => {
    }

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
                handleSecretEdit,
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
            if (filterIDs.includes(stateSecret.name)) {
                return true;
            }

            return false;
        });

        const sortedSecrets = filteredSecrets.sort(
            compareValues('path'),
        );

        setFilteredRows(
            sortedSecrets.map(
                secret => secretRowRenderer(
                    secret,
                    handleSecretEdit,
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
                handleSecretEdit,
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
                path
            </div>

            <div>
                provider
            </div>

            <div />

            <div />
        </>
    );

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="auto 120px 30px 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no secrets"

            actionButtonText="Add Secret"
            actionButtonClick={() => {
                setGeneralView('add-secret');
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
