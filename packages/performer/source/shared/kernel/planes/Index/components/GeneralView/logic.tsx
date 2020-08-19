// #region imports
    // #region libraries
    import React from 'react';

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
        PluridIconExit,
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
export const generalSelectors = [
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

export const generalSelectorsIcons = {
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


export const renderSelectedView = (
    stateIndexGeneralSelector: any,
    setGeneralView: any,
) => {
    switch (stateIndexGeneralSelector) {
        case 'providers':
            return (
                <ProvidersView
                    setGeneralView={setGeneralView}
                />
            );
        case 'imagenes':
            return (
                <ImagenesView
                    setGeneralView={setGeneralView}
                />
            );
        case 'repositories':
            return (
                <RepositoriesView
                    setGeneralView={setGeneralView}
                />
            );
        case 'webhooks':
            return (
                <WebhooksView
                    setGeneralView={setGeneralView}
                />
            );
        case 'projects':
            return (
                <ProjectsView
                    setGeneralView={setGeneralView}
                />
            );
        case 'secrets':
            return (
                <SecretsView
                    setGeneralView={setGeneralView}
                />
            );
        case 'triggers':
            return (
                <TriggersView
                    setGeneralView={setGeneralView}
                />
            );
        case 'deployers':
            return (
                <DeployersView
                    setGeneralView={setGeneralView}
                />
            );
        case 'builds':
            return (
                <BuildsView />
            );
        case 'deploys':
            return (
                <DeploysView />
            );
        default:
            return (<></>);
    }
}


export const renderGeneralView = (
    stateGeneralTheme: any,
    stateInteractionTheme: any,
    stateIndexGeneralView: any,
    stateIndexGeneralSelector: any,
    stateViewCompactSelectors: any,
    stateViewUsageType: any,
    stateViewOwnerID: any,
    stateActiveProviderID: any,
    openManual: any,
    logout: any,
    mouseOverSelectors: any,
    setMouseOverSelectors: any,
    setCompactSelectors: any,
    selectedView: any,
    setSelectedView: any,
    setGeneralView: any,
) => {
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
                        viewUsageType={stateViewUsageType}
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

                                    {stateViewUsageType === 'PRIVATE_USAGE' && (
                                        <StyledGeneralHelpItem
                                            onClick={() => logout()}
                                            compactSelectors={stateViewCompactSelectors}
                                        >
                                            <PluridIconExit />

                                            {!stateViewCompactSelectors && (
                                                <>
                                                    <div>
                                                        logout ({stateViewOwnerID})
                                                    </div>

                                                    <div />
                                                </>
                                            )}
                                        </StyledGeneralHelpItem>
                                    )}
                                </ul>
                            )}
                        </StyledGeneralHelp>
                    </StyledGeneralSelectors>

                    <StyledGeneralSelected>
                        {selectedView}
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
}
// #endregion module
