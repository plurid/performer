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

import {
    PluridIconToolbox,
    PluridIconRepository,
    PluridIconWebhook,
    PluridIconNewStateline,
    PluridIconSpace,
    PluridIconTools,
    PluridIconArrowRight,
    PluridIconDocuments,
    PluridIconExternalLink,
} from '@plurid/plurid-icons-react';


/** external */
import performerLogo from '../../assets/performer-logo.png';

import Provider from '#kernel-components/Provider';
import Repositories from '#kernel-components/Repositories';
import Webhook from '#kernel-components/Webhook';
import Trigger from '#kernel-components/Trigger';
import Imagene from '#kernel-components/Imagene';

import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
import actions from '#kernel-services/state/actions';


/** internal */
import ProvidersView from './components/ProvidersView';
import RepositoriesView from './components/RepositoriesView';
import TriggersView from './components/TriggersView';
import WebhooksView from './components/WebhooksView';
import BuildsView from './components/BuildsView';
import ImagenesView from './components/ImagenesVIew';

import {
    StyledGeneralView,
    StyledGeneralSelectors,
    StyledGeneralSelectorItem,
    StyledGeneralPeformer,
    StyledGeneralHelp,
    StyledGeneralHelpItem,
    StyledGeneralSelected,
} from './styled';
/** [END] imports */



const generalSelectors = [
    'providers',
    'repositories',
    'webhooks',
    'triggers',
    'builds',
    'imagenes',
];

const generalSelectorsIcons = {
    providers: PluridIconToolbox,
    repositories: PluridIconRepository,
    webhooks: PluridIconWebhook,
    triggers: PluridIconNewStateline,
    builds: PluridIconSpace,
    imagenes: PluridIconTools,
};

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
    stateInteractionTheme: Theme;
    stateActiveProviderID: string;
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
        stateInteractionTheme,
        stateActiveProviderID,

        /** dispatch */
    } = properties;


    /** state */
    const [
        selectedView,
        setSelectedView,
    ] = useState('providers');
    const [
        generalView,
        setGeneralView,
    ] = useState('general');
    const [
        webhookEditID,
        setWebhookEditID,
    ] = useState('');
    const [
        triggerEditID,
        setTriggerEditID,
    ] = useState('');
    const [
        mouseOverSelectors,
        setMouseOverSelectors,
    ] = useState(false);
    const [
        compactSelectors,
        setCompactSelectors,
    ] = useState(false);


    /** handlers */
    const openManual = () => {
        window.open('https://manual.plurid.com/performer', '_blank');
    }


    /** render */
    let renderSelectedView = (<></>);
    switch (selectedView) {
        case 'providers':
            renderSelectedView = (
                <ProvidersView
                    setGeneralView={setGeneralView}
                />
            );
            break;
        case 'repositories':
            renderSelectedView = (
                <RepositoriesView
                    setGeneralView={setGeneralView}
                />
            );
            break;
        case 'webhooks':
            renderSelectedView = (
                <WebhooksView
                    setGeneralView={setGeneralView}
                />
            );
            break;
        case 'triggers':
            renderSelectedView = (
                <TriggersView
                    setGeneralView={setGeneralView}
                />
            );
            break;
        case 'builds':
            renderSelectedView = (
                <BuildsView />
            );
            break;
        case 'imagenes':
            renderSelectedView = (
                <ImagenesView
                    setGeneralView={setGeneralView}
                />
            );
            break;
    }

    switch (generalView) {
        case 'general':
            return (
                <StyledGeneralView
                    compactSelectors={compactSelectors}
                >
                    <StyledGeneralSelectors
                        onMouseEnter={() => setMouseOverSelectors(true)}
                        onMouseLeave={() => setMouseOverSelectors(false)}
                        theme={stateGeneralTheme}
                        compactSelectors={compactSelectors}
                    >
                        <StyledGeneralPeformer
                            compactSelectors={compactSelectors}
                        >
                            {!compactSelectors && (
                                <>
                                    <div>
                                        <img
                                            src={performerLogo}
                                            alt="performer"
                                            height={30}
                                            onClick={() => setCompactSelectors(true)}
                                        />
                                    </div>

                                    <div>
                                        performer
                                    </div>
                                </>
                            )}

                            {compactSelectors
                            && mouseOverSelectors
                            && (
                                <PluridIconArrowRight
                                    atClick={() => setCompactSelectors(false)}
                                />
                            )}
                        </StyledGeneralPeformer>

                        <ul>
                            {generalSelectors.map(selector => {
                                const Icon = generalSelectorsIcons[selector];

                                return (
                                    <StyledGeneralSelectorItem
                                        key={selector}
                                        onClick={() => setSelectedView(selector)}
                                        theme={stateGeneralTheme}
                                        selected={selector === selectedView}
                                        compactSelectors={compactSelectors}
                                    >
                                        <Icon />

                                        {!compactSelectors && (
                                            <div>
                                                {selector}
                                            </div>
                                        )}
                                    </StyledGeneralSelectorItem>
                                );
                            })}
                        </ul>

                        <StyledGeneralHelp>
                            {mouseOverSelectors && (
                                <ul>
                                    <StyledGeneralHelpItem
                                        onClick={() => openManual()}
                                        compactSelectors={compactSelectors}
                                    >
                                        <PluridIconDocuments />

                                        {!compactSelectors && (
                                            <>
                                                <div>
                                                    manual
                                                </div>

                                                <PluridIconExternalLink/>
                                            </>
                                        )}
                                    </StyledGeneralHelpItem>
                                </ul>
                            )}
                        </StyledGeneralHelp>
                    </StyledGeneralSelectors>

                    <StyledGeneralSelected>
                        {renderSelectedView}
                    </StyledGeneralSelected>
                </StyledGeneralView>
            );
        case 'add-provider':
            return (
                <Provider
                    theme={stateInteractionTheme}
                    action={() => {
                        setGeneralView('general');
                    }}
                    cancel={() => setGeneralView('general')}
                />
            );
        case 'link-repositories':
            return (
                <Repositories
                    theme={stateInteractionTheme}
                    providerID={stateActiveProviderID}
                    action={() => {
                        setGeneralView('general');
                    }}
                    cancel={() => setGeneralView('general')}
                />
            );
        case 'add-webhook':
            return (
                <Webhook
                    theme={stateInteractionTheme}
                    providerID={stateActiveProviderID}
                    action={() => {
                        setGeneralView('general');
                    }}
                    cancel={() => setGeneralView('general')}
                />
            );
        case 'add-trigger':
            return (
                <Trigger
                    theme={stateInteractionTheme}
                    providerID={stateActiveProviderID}
                    action={() => {
                        setGeneralView('general');
                    }}
                    cancel={() => setGeneralView('general')}
                />
            );
        case 'add-imagene':
            return (
                <Imagene
                    theme={stateInteractionTheme}
                    providerID={stateActiveProviderID}
                    action={() => {
                        setGeneralView('general');
                    }}
                    cancel={() => setGeneralView('general')}
                />
            );
        default:
            return (
                <></>
            );
    }
}


const mapStateToProperties = (
    state: AppState,
): GeneralViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateActiveProviderID: selectors.data.getActiveProviderID(state),
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
