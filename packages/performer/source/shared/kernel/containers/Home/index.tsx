// #region imports
    // #region libraries
    import React, {
        useEffect,
    } from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        graphql,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import Head from '#kernel-components/Head';

    import client from '#kernel-services/graphql/client';
    import {
        GET_SETUP,
    } from '#kernel-services/graphql/query';

    import { AppState } from '#kernel-services/state/store';
    import selectors from '#kernel-services/state/selectors';
    import actions from '#kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledHome,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface HomeOwnProperties {
}

export interface HomeStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
}

export interface HomeDispatchProperties {
    dispatchSetActiveProviderID: typeof actions.data.setActiveProviderID;
    dispatchSetProviders: typeof actions.data.setProviders;
    dispatchSetImagenes: typeof actions.data.setImagenes;
    dispatchSetRepositories: typeof actions.data.setRepositories;
    dispatchSetWebhooks: typeof actions.data.setWebhooks;
    dispatchSetProjects: typeof actions.data.setProjects;
    dispatchSetSecrets: typeof actions.data.setSecrets;
    dispatchSetTriggers: typeof actions.data.setTriggers;
    dispatchSetDeployers: typeof actions.data.setDeployers;
    dispatchSetBuilds: typeof actions.data.setBuilds;
    dispatchSetDeploys: typeof actions.data.setDeploys;
    dispatchSetViewLoading: typeof actions.view.setViewLoading;
}

export type HomeProperties = HomeOwnProperties
    & HomeStateProperties
    & HomeDispatchProperties;

const Home: React.FC<HomeProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region state
        // stateGeneralTheme,
        // stateInteractionTheme,
        // #endregion state

        // #region dispatch
        dispatchSetActiveProviderID,
        dispatchSetProviders,
        dispatchSetImagenes,
        dispatchSetRepositories,
        dispatchSetWebhooks,
        dispatchSetProjects,
        dispatchSetSecrets,
        dispatchSetTriggers,
        dispatchSetDeployers,
        dispatchSetBuilds,
        dispatchSetViewLoading,
        dispatchSetDeploys,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region effects
    useEffect(() => {
        const getSetup = async () => {
            const setupQuery = await client.query({
                query: GET_SETUP,
            });

            const response = setupQuery.data.getSetup;

            if (!response.status) {
                dispatchSetViewLoading(false);
                return;
            }

            const {
                providers,
                imagenes,
                repositories,
                webhooks,
                projects,
                secrets,
                triggers,
                deployers,
                builds,
                deploys,
            } = graphql.deleteTypenames(response.data);

            if (providers.length > 0) {
                dispatchSetActiveProviderID(
                    providers[0].id,
                );
            }

            dispatchSetProviders(providers);
            dispatchSetImagenes(imagenes);
            dispatchSetRepositories(repositories);
            dispatchSetWebhooks(webhooks);
            dispatchSetProjects(projects);
            dispatchSetSecrets(secrets);
            dispatchSetTriggers(triggers);
            dispatchSetDeployers(deployers);
            dispatchSetBuilds(builds);
            dispatchSetDeploys(deploys);
            dispatchSetViewLoading(false);
        }

        getSetup();
    }, []);
    // #endregion effects


    // #region render
    return (
        <StyledHome>
            <Head />
        </StyledHome>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): HomeStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): HomeDispatchProperties => ({
    dispatchSetActiveProviderID: (
        providerID,
    ) => dispatch(
        actions.data.setActiveProviderID(providerID),
    ),
    dispatchSetProviders: (
        providers,
    ) => dispatch(
        actions.data.setProviders(providers),
    ),
    dispatchSetImagenes: (
        imagenes,
    ) => dispatch(
        actions.data.setImagenes(imagenes),
    ),
    dispatchSetRepositories: (
        repositories,
    ) => dispatch(
        actions.data.setRepositories(repositories),
    ),
    dispatchSetWebhooks: (
        webhooks,
    ) => dispatch(
        actions.data.setWebhooks(webhooks),
    ),
    dispatchSetProjects: (
        projects,
    ) => dispatch(
        actions.data.setProjects(projects),
    ),
    dispatchSetSecrets: (
        secrets,
    ) => dispatch(
        actions.data.setSecrets(secrets),
    ),
    dispatchSetTriggers: (
        triggers,
    ) => dispatch(
        actions.data.setTriggers(triggers),
    ),
    dispatchSetDeployers: (
        triggers,
    ) => dispatch(
        actions.data.setDeployers(triggers),
    ),
    dispatchSetBuilds: (
        builds,
    ) => dispatch(
        actions.data.setBuilds(builds),
    ),
    dispatchSetDeploys: (
        builds,
    ) => dispatch(
        actions.data.setDeploys(builds),
    ),
    dispatchSetViewLoading: (
        loading,
    ) => dispatch(
        actions.view.setViewLoading(loading),
    ),
});


const ConnectedHome = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(Home);
// #endregion module



// #region exports
export default ConnectedHome;
// #endregion exports
