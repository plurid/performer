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
        GENERATE_DEPLOYER,
    } from '#kernel-services/graphql/mutate';

    import {
        StyledPluridTextline,
        StyledPluridPureButton,
        StyledPluridLinkButton,
    } from '#kernel-services/styled';
    // #endregion external


    // #region internal
    import {
        StyledDeployer,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface DeployerProperties {
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

const Deployer: React.FC<DeployerProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            theme,
            providerID,
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
    const [deployerID, setDeployerID] = useState('');
    const [deployerName, setDeployerName] = useState('');
    const [deployerProject, setDeployerProject] = useState('');
    const [deployerRepository, setDeployerRepository] = useState('');
    const [deployerBranch, setDeployerBranch] = useState('');
    const [deployerPath, setDeployerPath] = useState('');
    const [deployerFile, setDeployerFile] = useState('');
    const [validDeployer, setValidDeployer] = useState(false);
    // #endregion state


    // #region handlers
    const addDeployer = async () => {
        if (!validDeployer) {
            return;
        }

        const input = {
            id: deployerID,
            name: deployerName,
            project: deployerProject,
            repository: deployerRepository,
            branch: deployerBranch,
            path: deployerPath,
            file: deployerFile,
        };

        await client.mutate({
            mutation: GENERATE_DEPLOYER,
            variables: {
                input,
            },
        });
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        if (
            deployerName
            && deployerProject
            && deployerRepository
            && deployerBranch
            && deployerPath
            && deployerFile
        ) {
            setValidDeployer(true);
        } else {
            setValidDeployer(false);
        }
    }, [
        deployerName,
        deployerProject,
        deployerRepository,
        deployerBranch,
        deployerPath,
        deployerFile,
    ]);

    useEffect(() => {
        if (editID) {
            // get deployer data
            // and set values
            setDeployerID(editID);
            setDeployerName('');
            setDeployerRepository('');
            setDeployerBranch('');
            setDeployerPath('');
            setDeployerFile('');
        }
    }, [
        editID,
    ]);
    // #endregion effects


    // #region render
    return (
        <StyledDeployer
            theme={theme}
        >
            <h1>
                {editID ? 'update' : 'generate'} deployer
            </h1>

            <div>
                <div>
                    <StyledPluridTextline
                        text={deployerID}
                        placeholder="id"
                        atChange={(event) => setDeployerID(event.target.value)}
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
                        text={deployerName}
                        placeholder="name"
                        atChange={(event) => setDeployerName(event.target.value)}
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
                        text={deployerProject}
                        placeholder="project"
                        atChange={(event) => setDeployerProject(event.target.value)}
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
                        text={deployerRepository}
                        placeholder="repository"
                        atChange={(event) => setDeployerRepository(event.target.value)}
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
                        text={deployerBranch}
                        placeholder="branch"
                        atChange={(event) => setDeployerBranch(event.target.value)}
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
                        text={deployerPath}
                        placeholder="path"
                        atChange={(event) => setDeployerPath(event.target.value)}
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
                        text={deployerFile}
                        placeholder="file"
                        atChange={(event) => setDeployerFile(event.target.value)}
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
                        text={editID ? 'Update Deployer' : 'Generate Deployer'}
                        atClick={() => {
                            action();
                            addDeployer();
                        }}
                        level={2}
                        disabled={!validDeployer}
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
        </StyledDeployer>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Deployer;
// #endregion exports
