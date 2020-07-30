/** [START] imports */
/** libraries */
import React from 'react';

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import {
    Theme,
} from '@plurid/plurid-themes';

/** external */
import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
// import actions from '#kernel-services/state/actions';

/** internal */
import {
    StyledBuild,
} from './styled';
/** [END] imports */



/** [START] component */
export interface BuildOwnProperties {
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
    /** properties */
    // const {
        // /** state */
        // stateGeneralTheme,
        // stateInteractionTheme,
    // } = properties;


    /** render */
    return (
        <StyledBuild>
            Build
        </StyledBuild>
    );
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


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(Build);
/** [END] component */
