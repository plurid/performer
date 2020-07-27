/** [START] imports */
/** libraries */
import React, {
    useState,
} from 'react';

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import {
    Theme
} from '@plurid/plurid-themes';


/** external */
import Provider from '#kernel-components/Provider';
import Webhook from '#kernel-components/Webhook';
import Repositories from '#kernel-components/Repositories';
import Trigger from '#kernel-components/Trigger';

import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
import actions from '#kernel-services/state/actions';


/** internal */
import {
    StyledSetupView,
} from './styled';
/** [END] imports */



/** [START] component */
export interface SetupViewOwnProperties {
    /** required */
    /** - values */
    /** - methods */
    setView: React.Dispatch<React.SetStateAction<string>>;

    /** optional */
    /** - values */
    /** - methods */
}

export interface SetupViewStateProperties {
    stateInteractionTheme: Theme;
}

export interface SetupViewDispatchProperties {
}

export type SetupViewProperties = SetupViewOwnProperties
    & SetupViewStateProperties
    & SetupViewDispatchProperties;

const SetupView: React.FC<SetupViewProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** own */
        /** required */
        /** - values */
        /** - methods */
        setView,

        /** optional */
        /** - values */
        /** - methods */

        /** state */
        stateInteractionTheme,
    } = properties;


    /** state */
    const [
        phase,
        setPhase,
    ] = useState('PROVIDER');


    /** render */
    return (
        <StyledSetupView>
            {phase === 'PROVIDER' && (
                <Provider
                    theme={stateInteractionTheme}
                    action={() => {
                        setPhase('REPOSITORY');
                    }}
                />
            )}

            {phase === 'REPOSITORY' && (
                <Repositories
                    theme={stateInteractionTheme}
                    action={() => {
                        setPhase('WEBHOOK');
                    }}
                />
            )}

            {phase === 'WEBHOOK' && (
                <Webhook
                    theme={stateInteractionTheme}
                    action={() => {
                        setPhase('TRIGGER');
                    }}
                />
            )}

            {phase === 'TRIGGER' && (
                <Trigger
                    theme={stateInteractionTheme}
                    action={() => {
                        setView('build');
                    }}
                />
            )}
        </StyledSetupView>
    );
}


const mapStateToProperties = (
    state: AppState,
): SetupViewStateProperties => ({
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): SetupViewDispatchProperties => ({
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(SetupView);
/** [END] component */
