/** [START] imports */
/** libraries */
import React from 'react';

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

/** internal */
/** [END] imports */



/** [START] component */
export interface ProvidersViewProperties {
    /** required */
    /** - values */
    generalTheme: Theme;
    interactionTheme: Theme;
    activeProviderID: string;
    data: ClientProvider[];
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

const ProvidersView: React.FC<ProvidersViewProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        generalTheme,
        interactionTheme,
        activeProviderID,
        data,
        /** - methods */

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** handlers */
    const handleObliterateProvider = async (
        id: string,
    ) => {
        try {
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

    const rows = data.map(provider => {
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
                        atClick={() => {}}
                        inline={true}
                        style={{
                            border: 'none',
                            fontWeight: 'normal',
                        }}
                    />

                    {activeProviderID === id
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
            generalTheme={generalTheme}
            interactionTheme={interactionTheme}

            rowTemplate="3fr 1fr 30px"
            rowsHeader={rowsHeader}
            rows={rows}

            actionButtonText="Add Provider"
            actionButtonClick={() => {}}

            filterUpdate={(value: string) => {
            }}
        />
    );
}


export default ProvidersView;
/** [END] component */
