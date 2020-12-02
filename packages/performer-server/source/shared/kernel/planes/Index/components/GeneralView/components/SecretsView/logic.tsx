// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridIconDelete,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import {
        Secret,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const secretRowRenderer = (
    secret: Secret,
    handleSecretObliterate: (
        id: string,
    ) => void,
) => {
    const {
        id,
        name,
        project,
        startsWith,
    } = secret;

    return (
        <>
            <div>
                {name}
            </div>

            <div>
                {startsWith}
            </div>

            <div>
                {project}
            </div>

            <PluridIconDelete
                atClick={() => handleSecretObliterate(id)}
            />
        </>
    );
}


export const createSearchTerms = (
    secrets: Secret[],
) => {
    const searchTerms = secrets.map(
        secret => {
            const {
                id,
                name,
                project,
            } = secret;

            const searchTerm = {
                id,
                data: [
                    name.toLowerCase(),
                    project.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}
// #endregion module
