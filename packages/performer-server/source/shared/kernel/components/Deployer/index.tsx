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
        GENERATE_DEPLOYER,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        Deployer as IDeployer,
    } from '~server/data/interfaces';

    import {
        addEntityMutation,
    } from '~kernel-services/logic/mutations';

    import {
        PluridInputLine,
        StyledPluridPureButton,
        StyledPluridLinkButton,
    } from '~kernel-services/styled';
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
        action: (
            deployer: IDeployer,
        ) => void;
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
    const generateDeployer = async () => {
        if (!validDeployer) {
            return;
        }

        const deployer: IDeployer | undefined = await addEntityMutation(
            {
                id: deployerID,
                name: deployerName,
                project: deployerProject,
                repository: deployerRepository,
                branch: deployerBranch,
                path: deployerPath,
                file: deployerFile,
            },
            GENERATE_DEPLOYER,
            'generateDeployer',
        );

        if (deployer) {
            action(deployer);
        }
    }

    const handleEnter = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            generateDeployer();
        }
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

            <PluridInputLine
                text={deployerID}
                name="id"
                atChange={(event) => setDeployerID(event.target.value)}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <PluridInputLine
                text={deployerName}
                name="name"
                atChange={(event) => setDeployerName(event.target.value)}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <PluridInputLine
                text={deployerProject}
                name="project"
                atChange={(event) => setDeployerProject(event.target.value)}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <PluridInputLine
                text={deployerRepository}
                name="repository"
                atChange={(event) => setDeployerRepository(event.target.value)}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <PluridInputLine
                text={deployerBranch}
                name="branch"
                atChange={(event) => setDeployerBranch(event.target.value)}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <PluridInputLine
                text={deployerPath}
                name="path"
                atChange={(event) => setDeployerPath(event.target.value)}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <PluridInputLine
                text={deployerFile}
                name="file"
                atChange={(event) => setDeployerFile(event.target.value)}
                atKeyDown={handleEnter}
                theme={theme}
            />

            <StyledPluridPureButton
                text={editID ? 'Update Deployer' : 'Generate Deployer'}
                atClick={() => generateDeployer()}
                level={2}
                disabled={!validDeployer}
            />

            {cancel && (
                <StyledPluridLinkButton
                    text="cancel"
                    atClick={() => cancel()}
                    theme={theme}
                    level={2}
                />
            )}
        </StyledDeployer>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Deployer;
// #endregion exports
