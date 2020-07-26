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
            <h1>
                builds
            </h1>

        </StyledBuildView>
    );
}


export default BuildView;
/** [END] component */
