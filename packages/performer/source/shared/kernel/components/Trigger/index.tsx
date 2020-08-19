// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import client from '#kernel-services/graphql/client';
    import {
        GENERATE_TRIGGER,
    } from '#kernel-services/graphql/mutate';

    import {
        StyledPluridTextline,
        StyledPluridPureButton,
        StyledPluridLinkButton,
    } from '#kernel-services/styled';
    // #endregion external


    // #region internal
    import {
        StyledTrigger,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface TriggerProperties {
    // #region required
        // #region values
        theme: Theme;
        providerID: string;
        // #endregion values

        // #region methods
        action: () => void;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        editID?: string;
        // #endregion values

        // #region methods
        cancel?: () => void;
        // #endregion methods
    // #endregion optional
}

const Trigger: React.FC<TriggerProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            theme,
            // #endregion values

            // #region methods
            action,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            editID,
            // #endregion values

            // #region methods
            cancel,
            // #endregion methods
        // #endregion optional
    } = properties;
    // #endregion properties


    // #region state
    const [triggerID, setTriggerID] = useState('');
    const [triggerName, setTriggerName] = useState('');
    const [triggerProject, setTriggerProject] = useState('');
    const [triggerRepository, setTriggerRepository] = useState('');
    const [triggerBranch, setTriggerBranch] = useState('');
    const [triggerPath, setTriggerPath] = useState('');
    const [triggerFile, setTriggerFile] = useState('');
    const [validTrigger, setValidTrigger] = useState(false);
    // #endregion state


    // #region handlers
    const addTrigger = async () => {
        if (!validTrigger) {
            return;
        }

        const input = {
            id: triggerID,
            name: triggerName,
            project: triggerProject,
            repository: triggerRepository,
            branch: triggerBranch,
            path: triggerPath,
            file: triggerFile,
        };

        await client.mutate({
            mutation: GENERATE_TRIGGER,
            variables: {
                input,
            },
        });
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        if (
            triggerName
            && triggerProject
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
        triggerProject,
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
    // #endregion effects


    // #region render
    return (
        <StyledTrigger
            theme={theme}
        >
            <h1>
                {editID ? 'update' : 'generate'} trigger
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
                        text={triggerProject}
                        placeholder="project"
                        atChange={(event) => setTriggerProject(event.target.value)}
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
                        placeholder="file"
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
                        text={editID ? 'Update Trigger' : 'Generate Trigger'}
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
    // #endregion render
}
// #endregion module



// #region exports
export default Trigger;
// #endregion exports
