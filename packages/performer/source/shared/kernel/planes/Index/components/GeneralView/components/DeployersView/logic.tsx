// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridIconEdit,
        PluridIconDelete,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import {
        Deployer,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports




// #region module
export const deployerRowRenderer = (
    deployer: Deployer,
    handleObliterateDeployer: (
        id: string,
    ) => void,
) => {
    const {
        id,
        name,
        repository,
        branch,
        path,
        file,
        project,
    } = deployer;

    return (
        <>
            <div>
                {name}
            </div>

            <div>
                {repository}
            </div>

            <div>
                {branch}
            </div>

            <div>
                {path}
            </div>

            <div>
                {file}
            </div>

            <div>
                {project}
            </div>

            <PluridIconEdit
                atClick={() => {}}
            />

            <PluridIconDelete
                atClick={() => handleObliterateDeployer(id)}
            />
        </>
    );
}


export const createSearchTerms = (
    deployers: Deployer[],
) => {
    const searchTerms = deployers.map(
        deployer => {
            const {
                id,
                name,
                repository,
                branch,
                path,
            } = deployer;

            const searchTerm = {
                id,
                data: [
                    name.toLowerCase(),
                    repository.toLowerCase(),
                    branch.toLowerCase(),
                    path.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}
// #endregion module
