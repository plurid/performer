import React, {
    useState,
    useEffect,
} from 'react';

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import {
    StyledPage,
} from './styled';

import InitialView from './components/InitialView';
import BuildView from './components/BuildView';

import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
import actions from '#kernel-services/state/actions';



export interface PageOwnProperties {
}

export interface PageStateProperties {
    stateProviders: string[];
}

export interface PageDispatchProperties {
}

export type PageProperties = PageOwnProperties
    & PageStateProperties
    & PageDispatchProperties;

const Page: React.FC<PageProperties> = (
    properties,
) => {
    /** properties */
    const {
        // plurid,

        /** state */
        stateProviders,
    } = properties;


    /** state */
    const [
        view,
        setView,
    ] = useState('initial');


    /** effect */
    useEffect(() => {
        if (stateProviders.length > 0) {
            setView('build');
        }
    }, [
        stateProviders,
    ]);


    /** render */
    return (
        <StyledPage>
            {view === 'initial' && (
                <InitialView />
            )}

            {view === 'build' && (
                <BuildView />
            )}
        </StyledPage>
    );
}


const mapStateToProperties = (
    state: AppState,
): PageStateProperties => ({
    stateProviders: selectors.data.getProviders(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): PageDispatchProperties => ({
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(Page);
