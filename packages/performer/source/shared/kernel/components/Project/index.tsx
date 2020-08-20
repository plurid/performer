// #region imports
    // #region libraries
    import React, {
        useState,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        graphql,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Project as IProject,
    } from '#server/data/interfaces';

    import client from '#kernel-services/graphql/client';
    import {
        GENERATE_PROJECT,
    } from '#kernel-services/graphql/mutate';

    import {
        StyledPluridTextline,
        StyledPluridPureButton,
        StyledPluridLinkButton,
    } from '#kernel-services/styled';
    // #endregion external


    // #region internal
    import {
        StyledProject,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface ProjectProperties {
    // #region required
        // #region values
        theme: Theme;
        // #endregion values

        // #region methods
        action: (
            project: IProject,
        ) => void;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        cancel?: () => void;
        // #endregion methods
    // #endregion optional
}

const Project: React.FC<ProjectProperties> = (
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
            // #endregion values

            // #region methods
            cancel,
            // #endregion methods
        // #endregion optional
    } = properties;
    // #endregion properties


    // #region state
    const [
        projectName,
        setProjectName,
    ] = useState('');
    // #endregion state


    // #region handlers
    const setProject = async () => {
        if (!projectName) {
            return;
        }

        const input = {
            value: projectName,
        };

        const mutation = await client.mutate({
            mutation: GENERATE_PROJECT,
            variables: {
                input,
            },
        });

        const reponse = mutation.data.generateProject;

        if (!reponse.status) {
            return;
        }

        const {
            data,
        } = reponse;

        return graphql.deleteTypenames(data);
    }
    // #endregion handlers


    // #region render
    return (
        <StyledProject
            theme={theme}
        >
            <div>
                <h1>
                    add project
                </h1>

                <div>
                    <StyledPluridTextline
                        text={projectName}
                        placeholder="name"
                        atChange={(event) => setProjectName(event.target.value)}
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
                        text="Add Project"
                        atClick={async () => {
                            const project = await setProject();

                            if (project) {
                                action(project);
                            }
                        }}
                        level={2}
                        disabled={!projectName}
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
        </StyledProject>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Project;
// #endregion exports
