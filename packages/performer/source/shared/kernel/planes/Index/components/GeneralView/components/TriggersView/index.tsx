/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconEdit,
    PluridIconDelete,
} from '@plurid/plurid-icons-react';


/** external */
import {
    Trigger,
} from '#server/data/interfaces';

import EntityView from '#kernel-components/EntityView';

import client from '#kernel-services/graphql/client';
import {
    OBLITERATE_TRIGGER,
} from '#kernel-services/graphql/mutate';

/** internal */
/** [END] imports */



/** [START] component */
export interface TriggersViewProperties {
    /** required */
    /** - values */
    generalTheme: Theme;
    interactionTheme: Theme;
    data: Trigger[];
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

const TriggersView: React.FC<TriggersViewProperties> = (
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
    const handleObliterateTrigger = async (
        id: string,
    ) => {
        try {
            const input = {
                value: id,
            };

            await client.mutate({
                mutation: OBLITERATE_TRIGGER,
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
                repository
            </div>

            <div>
                branch
            </div>

            <div>
                path
            </div>

            <div />

            <div />
        </>
    );

    const rows = data.map(trigger => {
        const {
            id,
            name,
            repository,
            branch,
            path,
        } = trigger;

        return (
            <>
                <div>
                    {name}
                </div>

                <div>
                    {repository}
                </div>

                <div>
                    {branch}
                </div>

                <div>
                    {path}
                </div>

                <PluridIconEdit
                    atClick={() => {}}
                />

                <PluridIconDelete
                    atClick={() => handleObliterateTrigger(id)}
                />
            </>
        );
    });

    return (
        <EntityView
            generalTheme={generalTheme}
            interactionTheme={interactionTheme}

            rowTemplate="2fr 1fr 1fr 2fr 30px 30px"
            rowsHeader={rowsHeader}
            rows={rows}

            actionButtonText="Add Trigger"
            actionButtonClick={() => {}}
        />
    );
}


export default TriggersView;
/** [END] component */
