import React from 'react';

import {
    PluridPureButton,
} from '@plurid/plurid-ui-react';

import {
    StyledPage,
} from './styled';

import performerLogo from './assets/performer-logo.png';



const Page: React.FC<any> = (
    properties,
) => {
    /** properties */
    // const {
    //     plurid,
    // } = properties;


    /** render */
    return (
        <StyledPage>
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
        </StyledPage>
    );
}


export default Page;
