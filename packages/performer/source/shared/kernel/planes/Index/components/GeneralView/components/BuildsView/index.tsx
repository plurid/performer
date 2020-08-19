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
        PluridLinkButton,
    } from '@plurid/plurid-ui-react';

    import {
        PluridApplicationConfigurator,
        TOPICS,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import {
        compareValues,
    } from '#server/utilities/general';

    import {
        Build,
    } from '#server/data/interfaces';

    import EntityView from '#kernel-components/EntityView';

    import { AppState } from '#kernel-services/state/store';
    import selectors from '#kernel-services/state/selectors';
    // import actions from '#kernel-services/state/actions';

    import {
        getFilterIDs,
    } from '#kernel-services/utilities';
    // #endregion external


    // #region internal
    import {
        pluridPubSub,
        buildRowRenderer,
        createSearchTerms,
    } from './logic';
    // #endregion internal
// #endregion imports



// #region module
export interface BuildsViewOwnProperties {
    /** required */
    /** - values */
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

export interface BuildsViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateBuilds: Build[];
}

export interface BuildsViewDispatchProperties {
}

export type BuildsViewProperties = BuildsViewOwnProperties
    & BuildsViewStateProperties
    & BuildsViewDispatchProperties;

const BuildsView: React.FC<BuildsViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region state
        stateGeneralTheme,
        stateInteractionTheme,
        stateBuilds,
        // #endregion state
    } = properties;
    // #endregion properties


    // #region handlers
    const openBuild = (
        id: string,
    ) => {
        pluridPubSub.publish(
            TOPICS.VIEW_ADD_PLANE,
            {
                plane: `/build/${id}`,
            },
        );
    }
    // #endregion handlers


    // #region state
    const [searchTerms, setSearchTerms] = useState(
        createSearchTerms(stateBuilds),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateBuilds.map(
            build => buildRowRenderer(
                build,
                openBuild,
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

        const filteredBuilds = stateBuilds.filter(stateBuild => {
            if (filterIDs.includes(stateBuild.id)) {
                return true;
            }

            return false;
        });

        const sortedBuilds = filteredBuilds.sort(
            compareValues('date', 'desc'),
        );

        setFilteredRows(
            sortedBuilds.map(
                build => buildRowRenderer(
                    build,
                    openBuild,
                ),
            ),
        );
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        const searchTerms = createSearchTerms(stateBuilds);

        setSearchTerms(searchTerms);
    }, [
        stateBuilds,
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
                trigger
            </div>

            <div>
                duration
            </div>

            <div>
                triggered
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
                noRows="no builds"

                filterUpdate={filterUpdate}
            />

            {stateBuilds.length > 0 && (
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
): BuildsViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateBuilds: selectors.data.getBuilds(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): BuildsViewDispatchProperties => ({
});


const ConnectedBuildsView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(BuildsView);
// #endregion module



// #region exports
export default ConnectedBuildsView;
// #endregion exports
