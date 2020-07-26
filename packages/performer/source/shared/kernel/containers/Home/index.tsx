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
// import actions from '#kernel-services/state/actions';



export interface HomeOwnProperties {
}

export interface HomeStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
}

export interface HomeDispatchProperties {
}

export type HomeProperties = HomeOwnProperties
    & HomeStateProperties
    & HomeDispatchProperties;

const Home: React.FC<HomeProperties> = (
    properties,
) => {
    /** properties */
    // const {
        // /** state */
        // stateGeneralTheme,
        // stateInteractionTheme,
    // } = properties;


    /** effects */
    useEffect(() => {
        const getSetup = async () => {
            const setupQuery = await client.query({
                query: GET_SETUP,
            });

            const response = setupQuery.data.getSetup;

            if (!response.status) {
                return;
            }

            const {
                builds,
                providers,
                repositories,
                triggers,
                webhooks,
            } = graphql.deleteTypenames(response.data);
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
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(Home);
