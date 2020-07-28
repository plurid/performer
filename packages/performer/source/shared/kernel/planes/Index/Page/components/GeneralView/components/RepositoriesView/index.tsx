/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconDelete,
} from '@plurid/plurid-icons-react';

import {
    PluridLinkButton,
} from '@plurid/plurid-ui-react';


/** external */
import {
    Repository,
} from '#server/data/interfaces';

import EntityView from '#kernel-components/EntityView';

/** internal */
/** [END] imports */



/** [START] component */
export interface RepositoriesViewProperties {
    /** required */
    /** - values */
    generalTheme: Theme;
    interactionTheme: Theme;
    data: Repository[];
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

const RepositoriesView: React.FC<RepositoriesViewProperties> = (
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

            <div />
        </>
    );

    const rows = data.map(repository => {
        const {
            name,
        } = repository;

        return (
            <>
                <div>
                    <PluridLinkButton
                        text={name}
                        atClick={() => {}}
                        inline={true}
                    />
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

            rowTemplate="4fr 30px"
            rowsHeader={rowsHeader}
            rows={rows}

            actionButtonText="Link Repositories"
            actionButtonClick={() => {}}
        />
    );
}


export default RepositoriesView;
/** [END] component */
