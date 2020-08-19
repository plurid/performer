// #region imports
    // #region libraries
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
    // #endregion libraries


    // #region external
    import {
        Secret,
    } from '#server/data/interfaces';

    import {
        compareValues,
    } from '#server/utilities/general';

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
    // #endregion external


    // #region internal
    import {
        secretRowRenderer,
        createSearchTerms,
    } from './logic';
    // #endregion internal
// #endregion imports



// #region module
export interface SecretsViewOwnProperties {
    // #region required
        // #region values
        // #endregion values

        // #region methods
        setGeneralView: any;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion optional
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
    // #region properties
    const {
        // #region required
            // #region values
            // #endregion values

            // #region methods
            setGeneralView,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional

        // #region state
        stateGeneralTheme,
        stateInteractionTheme,
        stateSecrets,
        // #endregion state

        // #region dispatch
        dispatchRemoveEntity,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region handlers
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
    // #endregion handlers


    // #region state
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
    // #endregion state


    // #region handlers
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
    // #endregion handlers


    // #region effects
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
    // #endregion effects


    // #region render
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
    // #endregion render
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


const ConnectedSecretsView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(SecretsView);
// #endregion module



// #region exports
export default ConnectedSecretsView;
// #endregion exports
