// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';
    // #endregion libraries


    // #region external
    import { AppState } from '#kernel-services/state/store';
    import selectors from '#kernel-services/state/selectors';
    import actions from '#kernel-services/state/actions';

    import {
        ClientProvider,
    } from '#server/data/interfaces';
    // #endregion external


    // #region internal
    import InitialView from './components/InitialView';
    import SetupView from './components/SetupView';
    import GeneralView from './components/GeneralView';

    import {
        StyledIndex,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface IndexOwnProperties {
}

export interface IndexStateProperties {
    stateProviders: ClientProvider[];
    stateViewLoading: boolean;
}

export interface IndexDispatchProperties {
}

export type IndexProperties = IndexOwnProperties
    & IndexStateProperties
    & IndexDispatchProperties;

const Index: React.FC<IndexProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region state
        stateProviders,
        stateViewLoading,
        // #endregion state
    } = properties;
    // #endregion properties


    // #region state
    const [
        view,
        setView,
    ] = useState('');
    // #endregion state


    // #region effects
    useEffect(() => {
        if (stateViewLoading) {
            return;
        }

        if (stateProviders.length > 0) {
            setView('general');
        } else {
            setView('initial');
        }
    }, [
        stateViewLoading,
        stateProviders,
    ]);
    // #endregion effects


    // #region render
    let renderView = (<></>);

    switch (view) {
        case 'initial':
            renderView = (
                <InitialView
                    setView={setView}
                />
            );
            break;
        case 'setup':
            renderView = (
                <SetupView
                    setView={setView}
                />
            );
            break;
        case 'general':
            renderView = (
                <GeneralView />
            );
            break;
    }

    return (
        <StyledIndex>
            {renderView}
        </StyledIndex>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): IndexStateProperties => ({
    stateProviders: selectors.data.getProviders(state),
    stateViewLoading: selectors.view.getLoading(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): IndexDispatchProperties => ({
});


const ConnectedIndex =connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(Index);
// #endregion module



// #region exports
export default ConnectedIndex;
// #endregion exports
