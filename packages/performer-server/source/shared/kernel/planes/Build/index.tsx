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
        uuid,
    } from '@plurid/plurid-functions';

    import {
        PluridPlaneComponentProperty,
    } from '@plurid/plurid-react';

    import {
        GET_BUILD_LOGS,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        Build,
    } from '~server/data/interfaces';

    import client from '~kernel-services/graphql/client';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledBuild,
        StyledGeneralSelectors,
        StyledGeneralSelectorItem,
        StyledGeneralSelectorIcon,
        StyledBuildTitle,
        StyledBuildLog,
        StyledBuildLogData,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface BuildOwnProperties {
    plurid: PluridPlaneComponentProperty;
}

export interface BuildStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
}

export interface BuildDispatchProperties {
}

export type BuildProperties = BuildOwnProperties
    & BuildStateProperties
    & BuildDispatchProperties;

const Build: React.FC<BuildProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region own
        plurid,
        // #endregion own

        // #region state
        stateGeneralTheme,
        // stateInteractionTheme,
        // #endregion state
    } = properties;

    const {
        id,
    } = plurid.plane.parameters;
    // #endregion properties


    // #region state
    const [
        selectedStage,
        setSelectedStage,
    ] = useState(-1);
    const [
        activeStage,
        setActiveStage,
    ] = useState<any>(null);
    const [
        buildLogs,
        setBuildLogs,
    ] = useState<any[]>([]);
    const [
        build,
        setBuild,
    ] = useState<Build | null>(null);
    // #endregion state


    // #region effects
    useEffect(() => {
        const loadLogs = async () => {
            try {
                const input = {
                    value: id,
                };

                const query = await client.query({
                    query: GET_BUILD_LOGS,
                    variables: {
                        input,
                    },
                });

                const response = query.data.getBuildLogs;

                if (!response.status) {
                    return;
                }

                const {
                    data,
                } = response;

                setBuild(data.build);
                setBuildLogs(data.results);
            } catch (error) {
                return;
            }
        }

        loadLogs();
    }, [
        id,
    ]);

    useEffect(() => {
        setActiveStage(buildLogs[selectedStage]);
    }, [
        selectedStage,
    ]);
    // #endregion effects


    // #region render
    return (
        <StyledBuild>
            <StyledGeneralSelectors
                theme={stateGeneralTheme}
            >
                <StyledBuildTitle>
                    {build && build.trigger}
                </StyledBuildTitle>

                <ul>
                    {build && build.stages.map((stage, index) => {
                        return (
                            <StyledGeneralSelectorItem
                                key={uuid.generate()}
                                theme={stateGeneralTheme}
                                selected={selectedStage === index}
                                onClick={() => setSelectedStage(index)}
                            >
                                <StyledGeneralSelectorIcon>
                                    {index}
                                </StyledGeneralSelectorIcon>

                                <div>
                                    {stage}
                                </div>
                            </StyledGeneralSelectorItem>
                        );
                    })}
                </ul>
            </StyledGeneralSelectors>

            <StyledBuildLog>
                {activeStage && (
                    <StyledBuildLogData>
                        {activeStage.data}
                    </StyledBuildLogData>
                )}
            </StyledBuildLog>
        </StyledBuild>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): BuildStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): BuildDispatchProperties => ({
});


const ConnectedBuild = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Build);
// #endregion module



// #region exports
export default ConnectedBuild;
// #endregion exports
