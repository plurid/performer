/** [START] imports */
/** libraries */
import React from 'react';

import {
    PluridPureButton,
} from '@plurid/plurid-ui-react';

/** external */

/** internal */
import {
    StyledBuildView,
} from './styled';
/** [END] imports */



/** [START] component */
export interface BuildViewProperties {
    /** required */
    /** - values */
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

const BuildView: React.FC<BuildViewProperties> = (
    properties,
) => {
    /** properties */
    // const {
    //     /** required */
    //     /** - values */
    //     /** - methods */

    //     /** optional */
    //     /** - values */
    //     /** - methods */
    // } = properties;


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
            </div>

            <div>
                <h1>
                    repositories
                </h1>

                <div>
                    link repositories
                </div>
            </div>

            <div>
                <h1>
                    webhooks
                </h1>

                <div>
                    add webhook
                </div>
            </div>

            <div>
                <h1>
                    triggers
                </h1>

                <div>
                    add trigger
                </div>
            </div>

            <div>
                <h1>
                    builds
                </h1>
            </div>
        </StyledBuildView>
    );
}


export default BuildView;
/** [END] component */
