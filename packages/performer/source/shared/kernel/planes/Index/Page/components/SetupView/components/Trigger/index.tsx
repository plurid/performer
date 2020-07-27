/** [START] imports */
/** libraries */
import React, {
    useState,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
import {
    StyledPluridTextline,
    StyledPluridPureButton,
} from '../../styled';


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
    setPhase: React.Dispatch<React.SetStateAction<string>>;
    setView: React.Dispatch<React.SetStateAction<string>>;

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
        setPhase,
        setView,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** state */
    const [triggerName, setTriggerName] = useState('');
    const [triggerRepository, setTriggerRepository] = useState('');
    const [triggerBranch, setTriggerBranch] = useState('');
    const [triggerPath, setTriggerPath] = useState('');


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
                            setView('build');
                        }}
                        level={2}
                    />
                </div>
            </div>
        </StyledTrigger>
    );
}


export default Trigger;
/** [END] component */
