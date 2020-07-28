/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconDelete,
} from '@plurid/plurid-icons-react';


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
        data,
        /** - methods */

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


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
            name,
            type,
        } = provider;

        return (
            <>
                <div>
                    {name}
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

            rowTemplate="3fr 1fr 30px"
            rowsHeader={rowsHeader}
            rows={rows}

            actionButtonText="Add Provider"
            actionButtonClick={() => {}}
        />
    );
}


export default ProvidersView;
/** [END] component */
