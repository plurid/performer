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

    import {
        PluridIconToolbox,
        PluridIconRepository,
        PluridIconWebhook,
        PluridIconSpace,
        PluridIconTools,
        PluridIconDeauthored,
        PluridIconNewStateline,
        PluridIconBrainCircuits,
        PluridIconApps,
        PluridIconBranch,
        PluridIconArrowRight,
        PluridIconDocuments,
        PluridIconExternalLink,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import performerLogo from '../../assets/performer-logo.png';

    import Provider from '#kernel-components/Provider';
    import Imagene from '#kernel-components/Imagene';
    import Repositories from '#kernel-components/Repositories';
    import Project from '#kernel-components/Project';
    import Secret from '#kernel-components/Secret';
    import Webhook from '#kernel-components/Webhook';
    import Trigger from '#kernel-components/Trigger';
    import Deployer from '#kernel-components/Deployer';

    import { AppState } from '#kernel-services/state/store';
    import selectors from '#kernel-services/state/selectors';
    import actions from '#kernel-services/state/actions';
    // #endregion external


    // #region internal
    import ProvidersView from './components/ProvidersView';
    import ImagenesView from './components/ImagenesVIew';
    import RepositoriesView from './components/RepositoriesView';
    import WebhooksView from './components/WebhooksView';
    import ProjectsView from './components/ProjectsView';
    import SecretsView from './components/SecretsView';
    import TriggersView from './components/TriggersView';
    import DeployersView from './components/DeployersView';
    import BuildsView from './components/BuildsView';
    import DeploysView from './components/DeploysView';

    import {
        StyledGeneralView,
        StyledGeneralSelectors,
        StyledGeneralSelectorItem,
        StyledGeneralPeformer,
        StyledGeneralHelp,
        StyledGeneralHelpItem,
        StyledGeneralSelected,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
const generalSelectors = [
    'providers',
    'imagenes',
    'repositories',
    'webhooks',
    'projects',
    'secrets',
    'triggers',
    'deployers',
    'builds',
    'deploys',
];

const generalSelectorsIcons = {
    providers: PluridIconToolbox,
    imagenes: PluridIconTools,
    repositories: PluridIconRepository,
    webhooks: PluridIconWebhook,
    projects: PluridIconApps,
    secrets: PluridIconDeauthored,
    deployers: PluridIconBrainCircuits,
    triggers: PluridIconNewStateline,
    builds: PluridIconSpace,
    deploys: PluridIconBranch,
};

export interface GeneralViewOwnProperties {
}

export interface GeneralViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateActiveProviderID: string;
    stateIndexGeneralSelector: string;
    stateIndexGeneralView: string;
    stateViewCompactSelectors: boolean;
}

export interface GeneralViewDispatchProperties {
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
        // #endregion state

        // #region dispatch
        dispatchSetViewType,
        dispatchSetViewCompactSelectors,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region state
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
    // #endregion state


    // #region handlers
    const openManual = () => {
        window.open('https://manual.plurid.com/performer', '_blank');
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
    let renderSelectedView = (<></>);
    switch (stateIndexGeneralSelector) {
        case 'providers':
            renderSelectedView = (
                <ProvidersView
                    setGeneralView={setGeneralView}
                />
            );
            break;
        case 'imagenes':
            renderSelectedView = (
                <ImagenesView
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
        case 'projects':
            renderSelectedView = (
                <ProjectsView
                    setGeneralView={setGeneralView}
                />
            );
            break;
        case 'secrets':
            renderSelectedView = (
                <SecretsView
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
        case 'deployers':
            renderSelectedView = (
                <DeployersView
                    setGeneralView={setGeneralView}
                />
            );
            break;
        case 'builds':
            renderSelectedView = (
                <BuildsView />
            );
            break;
        case 'deploys':
            renderSelectedView = (
                <DeploysView />
            );
            break;
    }

    switch (stateIndexGeneralView) {
        case 'general':
            return (
                <StyledGeneralView
                    compactSelectors={stateViewCompactSelectors}
                >
                    <StyledGeneralSelectors
                        onMouseEnter={() => setMouseOverSelectors(true)}
                        onMouseLeave={() => setMouseOverSelectors(false)}
                        theme={stateGeneralTheme}
                        compactSelectors={stateViewCompactSelectors}
                    >
                        <StyledGeneralPeformer
                            compactSelectors={stateViewCompactSelectors}
                        >
                            {!stateViewCompactSelectors && (
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

                            {stateViewCompactSelectors
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
                                        selected={selector === stateIndexGeneralSelector}
                                        compactSelectors={stateViewCompactSelectors}
                                    >
                                        <Icon />

                                        {!stateViewCompactSelectors && (
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
                                        compactSelectors={stateViewCompactSelectors}
                                    >
                                        <PluridIconDocuments />

                                        {!stateViewCompactSelectors && (
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
        case 'generate-project':
            return (
                <Project
                    theme={stateInteractionTheme}
                    action={() => {
                        setGeneralView('general');
                    }}
                    cancel={() => setGeneralView('general')}
                />
            );
        case 'store-secret':
            return (
                <Secret
                    theme={stateInteractionTheme}
                    action={() => {
                        setGeneralView('general');
                    }}
                    cancel={() => setGeneralView('general')}
                />
            );
        case 'setup-webhook':
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
        case 'generate-trigger':
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
        case 'generate-deployer':
            return (
                <Deployer
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
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): GeneralViewDispatchProperties => ({
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
