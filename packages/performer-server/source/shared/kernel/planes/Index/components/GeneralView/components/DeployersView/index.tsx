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

    import {
        OBLITERATE_DEPLOYER,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        compareValues,
    } from '#server/utilities/general';

    import {
        Deployer,
    } from '#server/data/interfaces';

    import EntityView from '#kernel-components/EntityView';

    import client from '#kernel-services/graphql/client';

    import {
        getSetup,
    } from '#kernel-services/logic/queries';

    import { AppState } from '#kernel-services/state/store';
    import selectors from '#kernel-services/state/selectors';
    import actions from '#kernel-services/state/actions';

    import {
        getFilterIDs,
    } from '#kernel-services/utilities';
    // #endregion external


    // #region internal
    import {
        deployerRowRenderer,
        createSearchTerms,
    } from './logic';
    // #endregion internal
// #endregion imports



// #region module
export interface DeployersViewOwnProperties {
    // #region required
        // #region values
        // #endregion values

        // #region methods
        setGeneralView: any,
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion optional
}

export interface DeployersViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateDeployers: Deployer[];
}

export interface DeployersViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    dispatchRemoveEntity: typeof actions.data.removeEntity;
}

export type DeployersViewProperties = DeployersViewOwnProperties
    & DeployersViewStateProperties
    & DeployersViewDispatchProperties;

const DeployersView: React.FC<DeployersViewProperties> = (
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
        stateDeployers,
        // #endregion state

        // #region dispatch
        dispatch,
        dispatchRemoveEntity,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region handlers
    const handleObliterateDeployer = async (
        id: string,
    ) => {
        try {
            dispatchRemoveEntity({
                type: 'deployer',
                id,
            });

            const input = {
                value: id,
            };

            await client.mutate({
                mutation: OBLITERATE_DEPLOYER,
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
        createSearchTerms(stateDeployers),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateDeployers.map(
            deployer => deployerRowRenderer(
                deployer,
                handleObliterateDeployer,
            ),
        ),
    );
    // #endregion state


    // #region handlers
    const filterUpdate = (
        rawValue: string,
    ) => {
        const value = rawValue.toLowerCase();

        const filterIDs = getFilterIDs(searchTerms, value);

        const filteredDeployers = stateDeployers.filter(stateDeployer => {
            if (filterIDs.includes(stateDeployer.id)) {
                return true;
            }

            return false;
        });

        const sortedDeployers = filteredDeployers.sort(
            compareValues('name'),
        );

        setFilteredRows(
            sortedDeployers.map(
                deployer => deployerRowRenderer(
                    deployer,
                    handleObliterateDeployer,
                ),
            ),
        );
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        const searchTerms = createSearchTerms(
            stateDeployers,
        );
        const filteredRows = stateDeployers.map(
            deployer => deployerRowRenderer(
                deployer,
                handleObliterateDeployer,
            ),
        );

        setSearchTerms(searchTerms);
        setFilteredRows(filteredRows);
    }, [
        stateDeployers,
    ]);
    // #endregion effects


    // #region render
    const rowsHeader = (
        <>
            <div>
                name
            </div>

            <div>
                repository
            </div>

            <div>
                branch
            </div>

            <div>
                path
            </div>

            <div>
                deployer
            </div>

            <div>
                project
            </div>

            <div />

            <div />
        </>
    );

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="2fr 1fr 0.5fr 2fr 2fr 1fr 30px 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no deployers"

            actionButtonText="Generate Deployer"
            actionButtonClick={() => {
                setGeneralView('generate-deployer')
            }}

            filterUpdate={filterUpdate}
            refresh={() => {
                getSetup(dispatch);
            }}
        />
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): DeployersViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateDeployers: selectors.data.getDeployers(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): DeployersViewDispatchProperties => ({
    dispatch,
    dispatchRemoveEntity: (
        payload,
    ) => dispatch (
        actions.data.removeEntity(payload),
    ),
});
// #endregion module



// #region exports
export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(DeployersView);
// #endregion exports
