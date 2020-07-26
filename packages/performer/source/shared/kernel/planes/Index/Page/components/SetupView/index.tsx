/** [START] imports */
/** libraries */
import React from 'react';

import {
    PluridPureButton,
} from '@plurid/plurid-ui-react';

/** external */

/** internal */
import {
    StyledSetupView,
} from './styled';
/** [END] imports */



/** [START] component */
export interface SetupViewProperties {
    /** required */
    /** - values */
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

const SetupView: React.FC<SetupViewProperties> = (
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
        <StyledSetupView>
            <div>
                <h1>
                    setup provider
                </h1>
            </div>

            <div>
                <h1>
                    add repository
                </h1>
            </div>

            <div>
                <h1>
                    setup webhook
                </h1>
            </div>

            <div>
                <h1>
                    add trigger
                </h1>
            </div>
        </StyledSetupView>
    );
}


export default SetupView;
/** [END] component */
