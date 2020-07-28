/** [START] imports */
/** libraries */
import React, {
    useState,
} from 'react';

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
import {
    ClientProvider,
    Repository,
    Webhook,
    Trigger,
    Build,
} from '#server/data/interfaces';

import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
import actions from '#kernel-services/state/actions';


/** internal */
import ProvidersView from './components/ProvidersView';
import RepositoriesView from './components/RepositoriesView';
import TriggersView from './components/TriggersView';
import WebhooksView from './components/WebhooksView';
import BuildsView from './components/BuildsView';

import {
    StyledGeneralView,
    StyledGeneralSelectors,
    StyledGeneralSelectorItem,
    StyledGeneralSelected,
} from './styled';
/** [END] imports */



const generalSelectors = [
    'providers',
    'repositories',
    'webhooks',
    'triggers',
    'builds',
];

/** [START] component */
export interface GeneralViewOwnProperties {
    /** required */
    /** - values */
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

export interface GeneralViewStateProperties {
    stateGeneralTheme: Theme;
    stateActiveProviderID: string;
    stateProviders: ClientProvider[];
    stateRepositories: Repository[];
    stateWebhooks: Webhook[];
    stateTriggers: Trigger[];
    stateBuilds: Build[];
}

export interface GeneralViewDispatchProperties {
}

export type GeneralViewProperties = GeneralViewOwnProperties
    & GeneralViewStateProperties
    & GeneralViewDispatchProperties;

const GeneralView: React.FC<GeneralViewProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        /** - methods */

        /** optional */
        /** - values */
        /** - methods */

        /** state */
        stateGeneralTheme,
        stateActiveProviderID,
        stateProviders,
        stateRepositories,
        stateWebhooks,
        stateTriggers,
        stateBuilds,
    } = properties;


    /** state */
    const [
        selectedView,
        setSelectedView,
    ] = useState('providers');


    /** render */
    let renderSelectedView = (<></>);
    switch (selectedView) {
        case 'providers':
            renderSelectedView = (
                <ProvidersView
                    generalTheme={stateGeneralTheme}
                    interactionTheme={stateGeneralTheme}
                    activeProviderID={stateActiveProviderID}
                    data={stateProviders}
                />
            );
            break;
        case 'repositories':
            renderSelectedView = (
                <RepositoriesView
                    generalTheme={stateGeneralTheme}
                    interactionTheme={stateGeneralTheme}
                    data={stateRepositories}
                />
            );
            break;
        case 'webhooks':
            renderSelectedView = (
                <WebhooksView
                    generalTheme={stateGeneralTheme}
                    interactionTheme={stateGeneralTheme}
                    data={stateWebhooks}
                />
            );
            break;
        case 'triggers':
            renderSelectedView = (
                <TriggersView
                    generalTheme={stateGeneralTheme}
                    interactionTheme={stateGeneralTheme}
                    data={stateTriggers}
                />
            );
            break;
        case 'builds':
            renderSelectedView = (
                <BuildsView
                    generalTheme={stateGeneralTheme}
                    interactionTheme={stateGeneralTheme}
                    data={stateBuilds}
                />
            );
            break;
    }

    return (
        <StyledGeneralView>
            <StyledGeneralSelectors
                theme={stateGeneralTheme}
            >
                <ul>
                    {generalSelectors.map(selector => {
                        return (
                            <StyledGeneralSelectorItem
                                key={selector}
                                onClick={() => setSelectedView(selector)}
                                theme={stateGeneralTheme}
                                selected={selector === selectedView}
                            >
                                {selector}
                            </StyledGeneralSelectorItem>
                        );
                    })}
                </ul>
            </StyledGeneralSelectors>

            <StyledGeneralSelected>
                {renderSelectedView}
            </StyledGeneralSelected>
        </StyledGeneralView>
    );
}


const mapStateToProperties = (
    state: AppState,
): GeneralViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateActiveProviderID: selectors.data.getActiveProviderID(state),
    stateProviders: selectors.data.getProviders(state),
    stateRepositories: selectors.data.getRepositories(state),
    stateWebhooks: selectors.data.getWebhooks(state),
    stateTriggers: selectors.data.getTriggers(state),
    stateBuilds: selectors.data.getBuilds(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): GeneralViewDispatchProperties => ({
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(GeneralView);
/** [END] component */
