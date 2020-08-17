/** [START] imports */
/** libraries */
import React, {
    useState,
    useEffect,
} from 'react';

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
    compareValues,
} from '#server/utilities/general';

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

import {
    getFilterIDs,
} from '#kernel-services/utilities';

/** internal */
/** [END] imports */



const providerRowRenderer = (
    provider: ClientProvider,
    dispatchSetActiveProviderID: any,
    stateActiveProviderID: string,
    handleObliterateProvider: any,
) => {
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
}


const createSearchTerms = (
    providers: ClientProvider[],
) => {
    const searchTerms = providers.map(
        provider => {
            const {
                id,
                name,
                type,
            } = provider;

            const searchTerm = {
                id,
                data: [
                    name.toLowerCase(),
                    type.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}


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


    /** state */
    const [searchTerms, setSearchTerms] = useState(
        createSearchTerms(stateProviders),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateProviders.map(
            provider => providerRowRenderer(
                provider,
                dispatchSetActiveProviderID,
                stateActiveProviderID,
                handleObliterateProvider,
            ),
        ),
    );


    /** functions */
    const filterUpdate = (
        rawValue: string,
    ) => {
        const value = rawValue.toLowerCase();

        const filterIDs = getFilterIDs(
            searchTerms,
            value,
        );

        const filteredProviders = stateProviders.filter(stateProvider => {
            if (filterIDs.includes(stateProvider.id)) {
                return true;
            }

            return false;
        });

        const sortedProviders = filteredProviders.sort(
            compareValues('name'),
        );

        setFilteredRows(
            sortedProviders.map(
                provider => providerRowRenderer(
                    provider,
                    dispatchSetActiveProviderID,
                    stateActiveProviderID,
                    handleObliterateProvider,
                ),
            ),
        );
    }


    /** effects */
    useEffect(() => {
        const searchTerms = createSearchTerms(
            stateProviders,
        );
        const filteredRows = stateProviders.map(
            provider => providerRowRenderer(
                provider,
                dispatchSetActiveProviderID,
                stateActiveProviderID,
                handleObliterateProvider,
            ),
        );

        setSearchTerms(searchTerms);
        setFilteredRows(filteredRows);
    }, [
        stateProviders,
        stateActiveProviderID,
    ]);


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

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="3fr 1fr 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no providers"

            actionButtonText="Add Provider"
            actionButtonClick={() => {
                setGeneralView('add-provider');
            }}

            filterUpdate={filterUpdate}
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
