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

import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
import actions from '#kernel-services/state/actions';


/** internal */
import Webhook from './components/Webhook';
import Repository from './components/Repository';
import Trigger from './components/Trigger';

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
    const [phase, setPhase] = useState('PROVIDER');


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
                <Repository
                    theme={stateInteractionTheme}
                    setPhase={setPhase}
                />
            )}

            {phase === 'WEBHOOK' && (
                <Webhook
                    theme={stateInteractionTheme}
                    setPhase={setPhase}
                />
            )}

            {phase === 'TRIGGER' && (
                <Trigger
                    theme={stateInteractionTheme}
                    setPhase={setPhase}
                    setView={setView}
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
