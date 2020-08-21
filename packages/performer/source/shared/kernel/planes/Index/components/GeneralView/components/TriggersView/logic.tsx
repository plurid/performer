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
        Trigger,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const triggerRowRenderer = (
    trigger: Trigger,
    handleTriggerEdit: (
        id: string,
    ) => void,
    handleTriggerObliterate: (
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
    } = trigger;

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
                atClick={() => handleTriggerEdit(id)}
            />

            <PluridIconDelete
                atClick={() => handleTriggerObliterate(id)}
            />
        </>
    );
}


export const createSearchTerms = (
    triggers: Trigger[],
) => {
    const searchTerms = triggers.map(
        trigger => {
            const {
                id,
                name,
                repository,
                branch,
                path,
            } = trigger;

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
