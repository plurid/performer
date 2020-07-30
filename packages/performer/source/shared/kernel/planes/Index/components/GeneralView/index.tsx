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
    PluridIconArrowRight,
    PluridIconDocuments,
    PluridIconExternalLink,
} from '@plurid/plurid-icons-react';


/** external */
import performerLogo from '../../assets/performer-logo.png';

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
];

const generalSelectorsIcons = {
    providers: PluridIconToolbox,
    repositories: PluridIconRepository,
    webhooks: PluridIconWebhook,
    triggers: PluridIconNewStateline,
    builds: PluridIconSpace,
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

        /** dispatch */
    } = properties;


    /** state */
    const [
        selectedView,
        setSelectedView,
    ] = useState('providers');
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
                <ProvidersView />
            );
            break;
        case 'repositories':
            renderSelectedView = (
                <RepositoriesView />
            );
            break;
        case 'webhooks':
            renderSelectedView = (
                <WebhooksView />
            );
            break;
        case 'triggers':
            renderSelectedView = (
                <TriggersView />
            );
            break;
        case 'builds':
            renderSelectedView = (
                <BuildsView />
            );
            break;
    }

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
}


const mapStateToProperties = (
    state: AppState,
): GeneralViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
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
