/** [START] imports */
/** libraries */
import React from 'react';

import {
    PluridPureButton,
} from '@plurid/plurid-ui-react';


/** external */
import performerLogo from '../../assets/performer-logo.png';


/** internal */
import {
    StyledInitialView,
} from './styled';
/** [END] imports */



/** [START] component */
export interface InitialViewProperties {
    /** required */
    /** - values */
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

const InitialView: React.FC<InitialViewProperties> = (
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
        <StyledInitialView>
            <div>
                <img src={performerLogo} alt="performer logo" height={250} />
            </div>

            <h1>
                performer
            </h1>

            <h2>
                Cloud-Native Continuous Integration/Continuous Delivery Build Pipeline
            </h2>

            <div
                style={{
                    width: '200px',
                    margin: '50px auto',
                }}
            >
                <PluridPureButton
                    text="Initial Setup"
                    atClick={() => {}}
                    level={2}
                />
            </div>
        </StyledInitialView>
    );
}


export default InitialView;
/** [END] component */
