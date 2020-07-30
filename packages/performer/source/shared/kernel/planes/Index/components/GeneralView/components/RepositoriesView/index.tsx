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

import client from '#kernel-services/graphql/client';
import {
    UNLINK_REPOSITORY,
} from '#kernel-services/graphql/mutate';

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


    /** handlers */
    const unlinkRepository = async (
        id: string,
    ) => {
        try {
            const input = {
                value: id,
            };

            await client.mutate({
                mutation: UNLINK_REPOSITORY,
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

            <div />
        </>
    );

    const rows = data.map(repository => {
        const {
            id,
            name,
        } = repository;

        return (
            <>
                <div>
                    <PluridLinkButton
                        text={name}
                        atClick={() => {}}
                        inline={true}
                        style={{
                            border: 'none',
                            fontWeight: 'normal',
                        }}
                    />
                </div>

                <PluridIconDelete
                    atClick={() => unlinkRepository(id)}
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
