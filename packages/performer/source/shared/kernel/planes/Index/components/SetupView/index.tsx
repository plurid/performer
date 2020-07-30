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
    stateActiveProviderID: string;
}

export interface SetupViewDispatchProperties {
    dispatchSetActiveProviderID: typeof actions.data.setActiveProviderID;
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
        stateActiveProviderID,

        /** dispatch */
        dispatchSetActiveProviderID,
    } = properties;


    /** state */
    const [
        phase,
        setPhase,
    ] = useState('PROVIDER');


    const cancelPhases = () => {
        setView('general');
    }


    /** render */
    return (
        <StyledSetupView>
            {phase === 'PROVIDER' && (
                <Provider
                    theme={stateInteractionTheme}
                    action={(
                        providerID: string,
                    ) => {
                        dispatchSetActiveProviderID(providerID);
                        setPhase('REPOSITORY');
                    }}
                />
            )}

            {phase === 'REPOSITORY' && (
                <Repositories
                    theme={stateInteractionTheme}
                    providerID={stateActiveProviderID}
                    action={() => {
                        setPhase('WEBHOOK');
                    }}
                    cancel={() => cancelPhases()}
                />
            )}

            {phase === 'WEBHOOK' && (
                <Webhook
                    theme={stateInteractionTheme}
                    providerID={stateActiveProviderID}
                    action={() => {
                        setPhase('TRIGGER');
                    }}
                    cancel={() => cancelPhases()}
                />
            )}

            {phase === 'TRIGGER' && (
                <Trigger
                    theme={stateInteractionTheme}
                    providerID={stateActiveProviderID}
                    action={() => {
                        setView('general');
                    }}
                    cancel={() => cancelPhases()}
                />
            )}
        </StyledSetupView>
    );
}


const mapStateToProperties = (
    state: AppState,
): SetupViewStateProperties => ({
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateActiveProviderID: selectors.data.getActiveProviderID(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): SetupViewDispatchProperties => ({
    dispatchSetActiveProviderID: (
        providerID,
    ) => dispatch(
        actions.data.setActiveProviderID(providerID),
    ),
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(SetupView);
/** [END] component */
