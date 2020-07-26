/** [START] imports */
/** libraries */
import React from 'react';

import {
    PluridPureButton,
    PluridTextline,
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

                <div>
                    <div>
                        github
                    </div>

                    <div>
                        bitbucket
                    </div>
                </div>

                <div>
                    <PluridTextline
                        text=""
                        placeholder="token"
                        atChange={() => {}}
                    />
                </div>
            </div>

            <div>
                <h1>
                    add repository
                </h1>

                <div>
                    select from list
                </div>

                <ul>
                    <li>
                        repo 1
                    </li>
                    <li>
                        repo 2
                    </li>
                </ul>
            </div>

            <div>
                <h1>
                    setup webhook
                </h1>

                <div>
                    <PluridTextline
                        text=""
                        placeholder="path"
                        atChange={() => {}}
                    />
                </div>
            </div>

            <div>
                <h1>
                    add trigger
                </h1>

                <div>
                    <PluridTextline
                        text=""
                        placeholder="name"
                        atChange={() => {}}
                    />

                    <PluridTextline
                        text=""
                        placeholder="repository"
                        atChange={() => {}}
                    />

                    <PluridTextline
                        text=""
                        placeholder="branch"
                        atChange={() => {}}
                    />

                    <PluridTextline
                        text=""
                        placeholder="path"
                        atChange={() => {}}
                    />
                </div>
            </div>
        </StyledSetupView>
    );
}


export default SetupView;
/** [END] component */
