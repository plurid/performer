// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        UPDATE_TRIGGER,
        GENERATE_TRIGGER,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        Trigger as ITrigger,
    } from '#server/data/interfaces';

    import {
        addEntityMutation,
    } from '#kernel-services/logic/mutations';

    import {
        PluridInputLine,
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
        action: (
            trigger: ITrigger,
        ) => void;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        editID?: string;
        // #endregion values

        // #region methods
        cancel?: () => void;
        findEntityByID?: (
            entity: string,
            id: string,
        ) => any;
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
            findEntityByID,
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
    const updateTrigger = async () => {
        const trigger: ITrigger | undefined = await addEntityMutation(
            {
                id: triggerID,
                name: triggerName,
                project: triggerProject,
                repository: triggerRepository,
                branch: triggerBranch,
                path: triggerPath,
                file: triggerFile,
            },
            UPDATE_TRIGGER,
            'updateTrigger',
        );

        if (trigger) {
            action(trigger);
        }
    }

    const generateTrigger = async () => {
        if (!validTrigger) {
            return;
        }

        if (editID) {
            await updateTrigger();
            return;
        }

        const trigger: ITrigger | undefined = await addEntityMutation(
            {
                id: triggerID,
                name: triggerName,
                project: triggerProject,
                repository: triggerRepository,
                branch: triggerBranch,
                path: triggerPath,
                file: triggerFile,
            },
            GENERATE_TRIGGER,
            'generateTrigger',
        );

        if (trigger) {
            action(trigger);
        }
    }

    const handleEnter = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            generateTrigger();
        }
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
        const getTrigger = async (
            editID: string,
        ) => {
            if (!findEntityByID) {
                return;
            }

            const trigger: ITrigger | undefined = await findEntityByID(
                'trigger',
                editID,
            );

            if (!trigger) {
                return;
            }

            setTriggerID(editID);
            setTriggerName(trigger.name);
            setTriggerProject(trigger.project);
            setTriggerRepository(trigger.repository);
            setTriggerBranch(trigger.branch);
            setTriggerPath(trigger.path);
            setTriggerFile(trigger.file);
        }

        if (editID) {
            getTrigger(editID);
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


            <PluridInputLine
                text={triggerID}
                name="name"
                atChange={(event) => {
                    if (editID) {
                        return;
                    }

                    setTriggerID(event.target.value);
                }}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <PluridInputLine
                text={triggerName}
                name="name"
                atChange={(event) => setTriggerName(event.target.value)}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <PluridInputLine
                text={triggerProject}
                name="project"
                atChange={(event) => setTriggerProject(event.target.value)}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <PluridInputLine
                text={triggerRepository}
                name="repository"
                atChange={(event) => setTriggerRepository(event.target.value)}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <PluridInputLine
                text={triggerBranch}
                name="branch"
                atChange={(event) => setTriggerBranch(event.target.value)}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <PluridInputLine
                text={triggerPath}
                name="path"
                atChange={(event) => setTriggerPath(event.target.value)}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <PluridInputLine
                text={triggerFile}
                name="file"
                atChange={(event) => setTriggerFile(event.target.value)}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <StyledPluridPureButton
                text={editID ? 'Update Trigger' : 'Generate Trigger'}
                atClick={() => generateTrigger()}
                level={2}
                disabled={!validTrigger}
            />

            {cancel && (
                <StyledPluridLinkButton
                    text="cancel"
                    atClick={() => cancel()}
                    theme={theme}
                    level={2}
                />
            )}
        </StyledTrigger>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Trigger;
// #endregion exports
