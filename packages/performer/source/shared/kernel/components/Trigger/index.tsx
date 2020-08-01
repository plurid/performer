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
    StyledPluridLinkButton,
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
    providerID: string;
    /** - methods */
    action: () => void;

    /** optional */
    /** - values */
    editID?: string;
    /** - methods */
    cancel?: () => void;
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
        editID,
        /** - methods */
        cancel,
    } = properties;


    /** state */
    const [triggerID, setTriggerID] = useState('');
    const [triggerName, setTriggerName] = useState('');
    const [triggerRepository, setTriggerRepository] = useState('');
    const [triggerBranch, setTriggerBranch] = useState('');
    const [triggerPath, setTriggerPath] = useState('');
    const [triggerFile, setTriggerFile] = useState('');
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
            file: triggerFile,
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
            && triggerFile
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
        triggerFile,
    ]);

    useEffect(() => {
        if (editID) {
            // get trigger data
            // and set values
            setTriggerID(editID);
            setTriggerName('');
            setTriggerRepository('');
            setTriggerBranch('');
            setTriggerPath('');
            setTriggerFile('');
        }
    }, [
        editID,
    ]);


    /** render */
    return (
        <StyledTrigger
            theme={theme}
        >
            <h1>
                {editID ? 'update' : 'add'} trigger
            </h1>

            <div>
                <div>
                    <StyledPluridTextline
                        text={triggerID}
                        placeholder="id"
                        atChange={(event) => setTriggerID(event.target.value)}
                        spellCheck={false}
                        autoCapitalize="false"
                        autoComplete="false"
                        autoCorrect="false"
                        theme={theme}
                        level={2}
                    />
                </div>

                <div>
                    <StyledPluridTextline
                        text={triggerName}
                        placeholder="name"
                        atChange={(event) => setTriggerName(event.target.value)}
                        spellCheck={false}
                        autoCapitalize="false"
                        autoComplete="false"
                        autoCorrect="false"
                        theme={theme}
                        level={2}
                    />
                </div>

                <div>
                    <StyledPluridTextline
                        text={triggerRepository}
                        placeholder="repository"
                        atChange={(event) => setTriggerRepository(event.target.value)}
                        spellCheck={false}
                        autoCapitalize="false"
                        autoComplete="false"
                        autoCorrect="false"
                        theme={theme}
                        level={2}
                    />
                </div>

                <div>
                    <StyledPluridTextline
                        text={triggerBranch}
                        placeholder="branch"
                        atChange={(event) => setTriggerBranch(event.target.value)}
                        spellCheck={false}
                        autoCapitalize="false"
                        autoComplete="false"
                        autoCorrect="false"
                        theme={theme}
                        level={2}
                    />
                </div>

                <div>
                    <StyledPluridTextline
                        text={triggerPath}
                        placeholder="path"
                        atChange={(event) => setTriggerPath(event.target.value)}
                        spellCheck={false}
                        autoCapitalize="false"
                        autoComplete="false"
                        autoCorrect="false"
                        theme={theme}
                        level={2}
                    />
                </div>

                <div>
                    <StyledPluridTextline
                        text={triggerFile}
                        placeholder="performer"
                        atChange={(event) => setTriggerFile(event.target.value)}
                        spellCheck={false}
                        autoCapitalize="false"
                        autoComplete="false"
                        autoCorrect="false"
                        theme={theme}
                        level={2}
                    />
                </div>

                <div>
                    <StyledPluridPureButton
                        text={editID ? 'Update Trigger' : 'Add Trigger'}
                        atClick={() => {
                            action();
                            addTrigger();
                        }}
                        level={2}
                        disabled={!validTrigger}
                    />
                </div>

                {cancel && (
                    <div>
                        <StyledPluridLinkButton
                            text="cancel"
                            atClick={() => cancel()}
                            theme={theme}
                            level={2}
                        />
                    </div>
                )}
            </div>
        </StyledTrigger>
    );
}


export default Trigger;
/** [END] component */
