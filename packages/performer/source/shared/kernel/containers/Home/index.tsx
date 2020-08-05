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

import {
    StyledHome,
} from './styled';

import Head from '#kernel-components/Head';

import client from '#kernel-services/graphql/client';
import {
    GET_SETUP,
} from '#kernel-services/graphql/query';

import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
import actions from '#kernel-services/state/actions';



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
    dispatchSetBuilds: typeof actions.data.setBuilds;
    dispatchSetViewLoading: typeof actions.view.setViewLoading;
}

export type HomeProperties = HomeOwnProperties
    & HomeStateProperties
    & HomeDispatchProperties;

const Home: React.FC<HomeProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** state */
        // stateGeneralTheme,
        // stateInteractionTheme,

        /** dispatch */
        dispatchSetActiveProviderID,
        dispatchSetProviders,
        dispatchSetImagenes,
        dispatchSetRepositories,
        dispatchSetWebhooks,
        dispatchSetProjects,
        dispatchSetSecrets,
        dispatchSetTriggers,
        dispatchSetBuilds,
        dispatchSetViewLoading,
    } = properties;


    /** effects */
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
                builds,
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
            dispatchSetBuilds(builds);
            dispatchSetViewLoading(false);
        }

        getSetup();
    }, []);


    /** render */
    return (
        <StyledHome>
            <Head />
        </StyledHome>
    );
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
    dispatchSetBuilds: (
        builds,
    ) => dispatch(
        actions.data.setBuilds(builds),
    ),
    dispatchSetViewLoading: (
        loading,
    ) => dispatch(
        actions.view.setViewLoading(loading),
    ),
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(Home);
