/** [START] imports */
/** libraries */
import React from 'react';

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconValid,
    PluridIconDelete,
} from '@plurid/plurid-icons-react';

import {
    PluridLinkButton,
} from '@plurid/plurid-ui-react';


/** external */
import {
    ClientProvider,
} from '#server/data/interfaces';

import EntityView from '#kernel-components/EntityView';

import client from '#kernel-services/graphql/client';
import {
    OBLITERATE_PROVIDER,
} from '#kernel-services/graphql/mutate';

import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
import actions from '#kernel-services/state/actions';

/** internal */
/** [END] imports */



/** [START] component */
export interface ProvidersViewOwnProperties {
    /** required */
    /** - values */
    /** - methods */
    setGeneralView: any;

    /** optional */
    /** - values */
    /** - methods */
}

export interface ProvidersViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateActiveProviderID: string;
    stateProviders: ClientProvider[];
}

export interface ProvidersViewDispatchProperties {
    dispatchRemoveEntity: typeof actions.data.removeEntity;
    dispatchSetActiveProviderID: typeof actions.data.setActiveProviderID;
}

export type ProvidersViewProperties = ProvidersViewOwnProperties
    & ProvidersViewStateProperties
    & ProvidersViewDispatchProperties;

const ProvidersView: React.FC<ProvidersViewProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        /** - methods */
        setGeneralView,

        /** optional */
        /** - values */
        /** - methods */

        /** state */
        stateGeneralTheme,
        stateInteractionTheme,
        stateActiveProviderID,
        stateProviders,

        /** dispatch */
        dispatchRemoveEntity,
        dispatchSetActiveProviderID,
    } = properties;


    /** handlers */
    const handleObliterateProvider = async (
        id: string,
    ) => {
        try {
            dispatchRemoveEntity({
                type: 'provider',
                id,
            });

            const input = {
                value: id,
            };

            await client.mutate({
                mutation: OBLITERATE_PROVIDER,
                variables: {
                    input,
                },
            });
        } catch (error) {
            return;
        }
    }


    /** render */
    const rowsHeader = (
        <>
            <div>
                name
            </div>

            <div>
                type
            </div>

            <div />
        </>
    );

    const rows = stateProviders.map(provider => {
        const {
            id,
            name,
            type,
        } = provider;

        return (
            <>
                <div
                    style={{
                        display: 'flex',
                        height: '20px',
                        alignItems: 'center',
                    }}
                >
                    <PluridLinkButton
                        text={name}
                        atClick={() => {
                            dispatchSetActiveProviderID(id);
                        }}
                        inline={true}
                        style={{
                            border: 'none',
                            fontWeight: 'normal',
                        }}
                    />

                    {stateActiveProviderID === id
                    ? (
                        <PluridIconValid
                            inactive={true}
                            style={{
                                marginLeft: '0.7rem',
                            }}
                        />
                    ) : (
                        <div />
                    )}
                </div>

                <div>
                    {type}
                </div>

                <PluridIconDelete
                    atClick={() => handleObliterateProvider(id)}
                />
            </>
        );
    });

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="3fr 1fr 30px"
            rowsHeader={rowsHeader}
            rows={rows}
            noRows="no providers"

            actionButtonText="Add Provider"
            actionButtonClick={() => {
                setGeneralView('add-provider');
            }}

            filterUpdate={(value: string) => {
            }}
        />
    );
}


const mapStateToProperties = (
    state: AppState,
): ProvidersViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateActiveProviderID: selectors.data.getActiveProviderID(state),
    stateProviders: selectors.data.getProviders(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ProvidersViewDispatchProperties => ({
    dispatchRemoveEntity: (
        payload,
    ) => dispatch (
        actions.data.removeEntity(payload),
    ),
    dispatchSetActiveProviderID: (
        id,
    ) => dispatch (
        actions.data.setActiveProviderID(id),
    ),
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(ProvidersView);
/** [END] component */
