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


    /** render */
    const rowsHeader = (
        <>
            <div />

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
                {activeProviderID === id
                ? (
                    <PluridIconValid
                        inactive={true}
                    />
                ) : (
                    <div />
                )}

                <div>
                    <PluridLinkButton
                        text={name}
                        atClick={() => {}}
                        inline={true}
                    />
                </div>

                <div>
                    {type}
                </div>

                <PluridIconDelete
                    atClick={() => {}}
                />
            </>
        );
    });

    return (
        <EntityView
            generalTheme={generalTheme}
            interactionTheme={interactionTheme}

            rowTemplate="30px 3fr 1fr 30px"
            rowsHeader={rowsHeader}
            rows={rows}

            actionButtonText="Add Provider"
            actionButtonClick={() => {}}
        />
    );
}


export default ProvidersView;
/** [END] component */
