/** [START] imports */
/** libraries */
import React, {
    useState,
} from 'react';


/** external */

/** internal */
import {
    StyledSetupView,
    StyledPluridTextline,
    StyledPluridPureButton,
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


    /** state */
    const [phase, setPhase] = useState('PROVIDER');

    const [providerToken, setProviderToken] = useState('');
    const [webhookPath, setWebhookPath] = useState('');
    const [triggerName, setTriggerName] = useState('');
    const [triggerRepository, setTriggerRepository] = useState('');
    const [triggerBranch, setTriggerBranch] = useState('');
    const [triggerPath, setTriggerPath] = useState('');


    /** render */
    return (
        <StyledSetupView>
            {phase === 'PROVIDER' && (
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
                        <StyledPluridTextline
                            text={providerToken}
                            placeholder="token"
                            atChange={(event) => setProviderToken(event.target.value)}
                            level={2}
                        />
                    </div>

                    <div>
                        <StyledPluridPureButton
                            text="Set Provider"
                            atClick={() => {
                                setPhase('REPOSITORY');
                            }}
                            level={2}
                        />
                    </div>
                </div>
            )}


            {phase === 'REPOSITORY' && (
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

                    <div>
                        <StyledPluridPureButton
                            text="Add Repository"
                            atClick={() => {
                                setPhase('WEBHOOK');
                            }}
                            level={2}
                        />
                    </div>
                </div>
            )}


            {phase === 'WEBHOOK' && (
                <div>
                    <h1>
                        setup webhook
                    </h1>

                    <div>
                        <StyledPluridTextline
                            text={webhookPath}
                            placeholder="path"
                            atChange={(event) => setWebhookPath(event.target.value)}
                            level={2}
                        />
                    </div>

                    <div>
                        <StyledPluridPureButton
                            text="Setup Webhook"
                            atClick={() => {
                                setPhase('TRIGGER');
                            }}
                            level={2}
                        />
                    </div>
                </div>
            )}


            {phase === 'TRIGGER' && (
                <div>
                    <h1>
                        add trigger
                    </h1>

                    <div>
                        <div>
                            <StyledPluridTextline
                                text={triggerName}
                                placeholder="name"
                                atChange={(event) => setTriggerName(event.target.value)}
                                level={2}
                            />
                        </div>

                        <div>
                            <StyledPluridTextline
                                text={triggerRepository}
                                placeholder="repository"
                                atChange={(event) => setTriggerRepository(event.target.value)}
                                level={2}
                            />
                        </div>

                        <div>
                            <StyledPluridTextline
                                text={triggerBranch}
                                placeholder="branch"
                                atChange={(event) => setTriggerBranch(event.target.value)}
                                level={2}
                            />
                        </div>

                        <div>
                            <StyledPluridTextline
                                text={triggerPath}
                                placeholder="path"
                                atChange={(event) => setTriggerPath(event.target.value)}
                                level={2}
                            />
                        </div>

                        <div>
                            <StyledPluridPureButton
                                text="Add Trigger"
                                atClick={() => {}}
                                level={2}
                            />
                        </div>
                    </div>
                </div>
            )}
        </StyledSetupView>
    );
}


export default SetupView;
/** [END] component */
