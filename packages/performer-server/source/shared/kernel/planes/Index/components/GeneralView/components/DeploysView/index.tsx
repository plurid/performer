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
        PluridIconCircle,
    } from '@plurid/plurid-icons-react';

    import {
        universal,
    } from '@plurid/plurid-ui-components-react';

    import {
        PluridApplicationConfigurator,
        PLURID_PUBSUB_TOPIC,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import {
        compareValues,
    } from '~server/utilities/general';

    import {
        Deploy,
    } from '~server/data/interfaces';

    import {
        getSetup,
    } from '~kernel-services/logic/queries';

    import EntityView from '~kernel-components/EntityView';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';

    import {
        getFilterIDs,
    } from '~kernel-services/utilities';
    // #endregion external


    // #region imports
    import {
        pluridPubSub,
        buildRowRenderer,
        createSearchTerms,
    } from './logic';
    // #endregion imports
// #endregion imports



// #region module
const {
    buttons: {
        LinkButton: PluridLinkButton,
    },
} = universal;


export interface DeploysViewOwnProperties {
}

export interface DeploysViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateDeploys: Deploy[];
}

export interface DeploysViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
}

export type DeploysViewProperties = DeploysViewOwnProperties
    & DeploysViewStateProperties
    & DeploysViewDispatchProperties;

const DeploysView: React.FC<DeploysViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region state
        stateGeneralTheme,
        stateInteractionTheme,
        stateDeploys,
        // #endregion state

        // #region dispatch
        dispatch,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region handlers
    const openDeploy = (
        id: string,
    ) => {
        pluridPubSub.publish({
            topic: PLURID_PUBSUB_TOPIC.VIEW_ADD_PLANE,
            data: {
                plane: `/build/${id}`,
            },
        });
    }
    // #endregion handlers


    // #region state
    const [searchTerms, setSearchTerms] = useState(
        createSearchTerms(stateDeploys),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateDeploys.map(
            build => buildRowRenderer(
                build,
                openDeploy,
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

        const filteredDeploys = stateDeploys.filter(stateDeploy => {
            if (filterIDs.includes(stateDeploy.id)) {
                return true;
            }

            return false;
        });

        const sortedDeploys = filteredDeploys.sort(
            compareValues('date', 'desc'),
        );

        setFilteredRows(
            sortedDeploys.map(
                build => buildRowRenderer(
                    build,
                    openDeploy,
                ),
            ),
        );
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        const searchTerms = createSearchTerms(stateDeploys);

        setSearchTerms(searchTerms);
    }, [
        stateDeploys,
    ]);
    // #endregion effects


    // #region render
    const rowsHeader = (
        <>
            <PluridIconCircle
                fill={true}
                inactive={true}
                size={20}
            />

            <div>
                id
            </div>

            <div>
                deployer
            </div>

            <div>
                duration
            </div>

            <div>
                deployed
            </div>

            <div>
                project
            </div>

            <div />
        </>
    );

    return (
        <>
            <PluridApplicationConfigurator
                pubsub={pluridPubSub}
            />

            <EntityView
                generalTheme={stateGeneralTheme}
                interactionTheme={stateInteractionTheme}

                rowTemplate="30px 60px auto 180px 200px 200px 30px"
                rowsHeader={rowsHeader}
                rows={filteredRows}
                noRows="no deploys"

                filterUpdate={filterUpdate}
                refresh={() => {
                    getSetup(dispatch);
                }}
            />

            {stateDeploys.length > 0 && (
                <div>
                    <PluridLinkButton
                        text="clear"
                        atClick={() => {}}
                        inline={true}
                    />
                </div>
            )}
        </>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): DeploysViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateDeploys: selectors.data.getDeploys(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): DeploysViewDispatchProperties => ({
    dispatch,
});


const ConnectedDeploysView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(DeploysView);
// #endregion module



// #region exports
export default ConnectedDeploysView;
// #endregion exports
