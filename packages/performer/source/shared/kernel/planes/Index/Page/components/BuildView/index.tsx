/** [START] imports */
/** libraries */
import React from 'react';

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import {
    PluridPureButton,
} from '@plurid/plurid-ui-react';


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
import {
    StyledBuildView,
} from './styled';
/** [END] imports */



/** [START] component */

export interface BuildViewOwnProperties {
    /** required */
    /** - values */
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

export interface BuildViewStateProperties {
    stateProviders: ClientProvider[];
    stateRepositories: Repository[];
    stateWebhooks: Webhook[];
    stateTriggers: Trigger[];
    stateBuilds: Build[];
}

export interface BuildViewDispatchProperties {
}

export type BuildViewProperties = BuildViewOwnProperties
    & BuildViewStateProperties
    & BuildViewDispatchProperties;

const BuildView: React.FC<BuildViewProperties> = (
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
        stateProviders,
        stateRepositories,
        stateWebhooks,
        stateTriggers,
        stateBuilds,
    } = properties;


    /** render */
    return (
        <StyledBuildView>
            <div>
                <h1>
                    providers
                </h1>

                <div>
                    add provider
                </div>

                <div>
                    <ul>
                        {stateProviders.map(provider => {
                            const {
                                id,
                                name,
                                type,
                            } = provider;

                            return (
                                <li
                                    key={id}
                                >
                                    {name} ({type})
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <div>
                <h1>
                    repositories
                </h1>

                <div>
                    link repositories
                </div>

                <div>
                    <ul>
                        {stateRepositories.map(repository => {
                            const {
                                id,
                                name,
                            } = repository;

                            return (
                                <li
                                    key={id}
                                >
                                    {name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <div>
                <h1>
                    webhooks
                </h1>

                <div>
                    add webhook
                </div>

                <div>
                    <ul>
                        {stateWebhooks.map(webhook => {
                            const {
                                id,
                                path,
                                provider
                            } = webhook;

                            return (
                                <li
                                    key={id}
                                >
                                    {path} ({provider})
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <div>
                <h1>
                    triggers
                </h1>

                <div>
                    add trigger
                </div>

                <div>
                    <ul>
                        {stateTriggers.map(trigger => {
                            const {
                                id,
                                name,
                                repository,
                                branch,
                                path,
                            } = trigger;

                            return (
                                <li
                                    key={id}
                                >
                                    {name} - {repository} - {branch} - {path}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <div>
                <h1>
                    builds
                </h1>

                <div>
                    <ul>
                        {stateBuilds.map(build => {
                            const {
                                id,

                            } = build;

                            return (
                                <li
                                    key={id}
                                >
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </StyledBuildView>
    );
}


const mapStateToProperties = (
    state: AppState,
): BuildViewStateProperties => ({
    stateProviders: selectors.data.getProviders(state),
    stateRepositories: selectors.data.getRepositories(state),
    stateWebhooks: selectors.data.getWebhooks(state),
    stateTriggers: selectors.data.getTriggers(state),
    stateBuilds: selectors.data.getBuilds(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): BuildViewDispatchProperties => ({
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(BuildView);
/** [END] component */
