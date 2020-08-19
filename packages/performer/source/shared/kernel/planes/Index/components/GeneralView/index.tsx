// #region imports
    // #region libraries
    import React, {
        useState,
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
        PERFORMER_MANUAL_LINK,
    } from '#kernel-data/constants';

    import client from '#kernel-services/graphql/client';
    import {
        LOGOUT
    } from '#kernel-services/graphql/mutate';

    import { AppState } from '#kernel-services/state/store';
    import selectors from '#kernel-services/state/selectors';
    import actions from '#kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        renderSelectedView,
        renderGeneralView,
    } from './logic';
    // #endregion internal
// #endregion imports



// #region module
export interface GeneralViewOwnProperties {
}

export interface GeneralViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateActiveProviderID: string;
    stateIndexGeneralSelector: string;
    stateIndexGeneralView: string;
    stateViewCompactSelectors: boolean;
    stateViewOwnerID: string;
    stateViewUsageType: string;
}

export interface GeneralViewDispatchProperties {
    dispatchClearData: typeof actions.data.clearData;
    dispatchSetViewType: typeof actions.view.setViewType;
    dispatchSetViewCompactSelectors: typeof actions.view.setViewCompactSelectors;
}

export type GeneralViewProperties = GeneralViewOwnProperties
    & GeneralViewStateProperties
    & GeneralViewDispatchProperties;

const GeneralView: React.FC<GeneralViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region state
        stateGeneralTheme,
        stateInteractionTheme,
        stateActiveProviderID,
        stateIndexGeneralSelector,
        stateIndexGeneralView,
        stateViewCompactSelectors,
        stateViewOwnerID,
        stateViewUsageType,
        // #endregion state

        // #region dispatch
        dispatchClearData,
        dispatchSetViewType,
        dispatchSetViewCompactSelectors,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region state
    const [
        mouseOverSelectors,
        setMouseOverSelectors,
    ] = useState(false);
    // #endregion state


    // #region handlers
    const openManual = () => {
        window.open(PERFORMER_MANUAL_LINK, '_blank');
    }

    const logout = async () => {
        try {
            dispatchSetViewType({
                type: 'indexView',
                value: 'private',
            });

            dispatchClearData();

            await client.mutate({
                mutation: LOGOUT,
            });

            return;
        } catch (error) {
            return;
        }
    }

    const setSelectedView = (
        view: string,
    ) => {
        dispatchSetViewType({
            type: 'indexGeneralSelector',
            value: view,
        });
    }

    const setGeneralView = (
        view: string,
    ) => {
        dispatchSetViewType({
            type: 'indexGeneralView',
            value: view,
        });
    }

    const setCompactSelectors = (
        value: boolean,
    ) => {
        dispatchSetViewCompactSelectors(value);
    }
    // #endregion handlers


    // #region render
    const selectedView = renderSelectedView(
        stateIndexGeneralSelector,
        setGeneralView,
    );

    return renderGeneralView(
        stateGeneralTheme,
        stateInteractionTheme,
        stateIndexGeneralView,
        stateIndexGeneralSelector,
        stateViewCompactSelectors,
        stateViewUsageType,
        stateViewOwnerID,
        stateActiveProviderID,
        openManual,
        logout,
        mouseOverSelectors,
        setMouseOverSelectors,
        setCompactSelectors,
        selectedView,
        setSelectedView,
        setGeneralView,
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): GeneralViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateActiveProviderID: selectors.data.getActiveProviderID(state),
    stateIndexGeneralSelector: selectors.view.getIndexGeneralSelector(state),
    stateIndexGeneralView: selectors.view.getIndexGeneralView(state),
    stateViewCompactSelectors: selectors.view.getViewCompactSelectors(state),
    stateViewOwnerID: selectors.view.getViewOwnerID(state),
    stateViewUsageType: selectors.view.getViewUsageType(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): GeneralViewDispatchProperties => ({
    dispatchClearData: () => dispatch(
        actions.data.clearData(),
    ),
    dispatchSetViewType: (
        payload,
    ) => dispatch(
        actions.view.setViewType(payload),
    ),
    dispatchSetViewCompactSelectors: (
        payload,
    ) => dispatch(
        actions.view.setViewCompactSelectors(payload),
    ),
});


export const ConnectedGeneralView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(GeneralView);
// #endregion module



// #region exports
export default ConnectedGeneralView;
// #endregion exports
