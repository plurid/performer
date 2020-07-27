/** [START] imports */
/** libraries */
import React, {
    useState,
    useEffect,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
import client from '#kernel-services/graphql/client';
import {
    ADD_TRIGGER,
} from '#kernel-services/graphql/mutate';

import {
    StyledPluridTextline,
    StyledPluridPureButton,
} from '#kernel-services/styled';


/** internal */
import {
    StyledTrigger,
} from './styled';
/** [END] imports */



/** [START] component */
export interface TriggerProperties {
    /** required */
    /** - values */
    theme: Theme;
    /** - methods */
    action: () => void;

    /** optional */
    /** - values */
    /** - methods */
}

const Trigger: React.FC<TriggerProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        /** - methods */
        action,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** state */
    const [triggerID, setTriggerID] = useState('');
    const [triggerName, setTriggerName] = useState('');
    const [triggerRepository, setTriggerRepository] = useState('');
    const [triggerBranch, setTriggerBranch] = useState('');
    const [triggerPath, setTriggerPath] = useState('');
    const [validTrigger, setValidTrigger] = useState(false);


    /** handle */
    const addTrigger = async () => {
        if (!validTrigger) {
            return;
        }

        const input = {
            id: triggerID,
            name: triggerName,
            repository: triggerRepository,
            branch: triggerBranch,
            path: triggerPath,
        };

        const mutation = await client.mutate({
            mutation: ADD_TRIGGER,
            variables: {
                input,
            },
        });
        console.log('mutation', mutation);
    }


    /** effects */
    useEffect(() => {
        if (
            triggerName
            && triggerRepository
            && triggerBranch
            && triggerPath
        ) {
            setValidTrigger(true);
        } else {
            setValidTrigger(false);
        }
    }, [
        triggerName,
        triggerRepository,
        triggerBranch,
        triggerPath,
    ]);


    /** render */
    return (
        <StyledTrigger
            theme={theme}
        >
            <h1>
                add trigger
            </h1>

            <div>
                <div>
                    <StyledPluridTextline
                        text={triggerID}
                        placeholder="id"
                        atChange={(event) => setTriggerID(event.target.value)}
                        level={2}
                    />
                </div>

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
                        atClick={() => {
                            action();
                            addTrigger();
                        }}
                        level={2}
                        disabled={!validTrigger}
                    />
                </div>
            </div>
        </StyledTrigger>
    );
}


export default Trigger;
/** [END] component */