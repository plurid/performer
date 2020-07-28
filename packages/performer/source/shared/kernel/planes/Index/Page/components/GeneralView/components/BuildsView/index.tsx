/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconEnter,
} from '@plurid/plurid-icons-react';


/** external */
import {
    Build,
} from '#server/data/interfaces';

import EntityView from '#kernel-components/EntityView';

/** internal */
/** [END] imports */



/** [START] component */
export interface BuildsViewProperties {
    /** required */
    /** - values */
    generalTheme: Theme;
    interactionTheme: Theme;
    data: Build[];
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

const BuildsView: React.FC<BuildsViewProperties> = (
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
                status
            </div>

            <div>
                trigger
            </div>

            <div>
                time
            </div>

            <div>
                date
            </div>

            <div />
        </>
    );

    const rows = data.map(build => {
        const {
            id,
            status,
            trigger,
            time,
            date,
        } = build;

        return (
            <>
                <div>
                    {status}
                </div>

                <div>
                    {trigger}
                </div>

                <div>
                    {time}
                </div>

                <div>
                    {date}
                </div>

                <PluridIconEnter
                    atClick={() => {}}
                />
            </>
        );
    });

    return (
        <EntityView
            generalTheme={generalTheme}
            interactionTheme={interactionTheme}

            rowTemplate="60px auto 60px 120px 30px"
            rowsHeader={rowsHeader}
            rows={rows}
        />
    );
}


export default BuildsView;
/** [END] component */
