// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridIconDelete,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import {
        Notifier,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const imageneRowRenderer = (
    imagene: Notifier,
    handleNotifierObliterate: (
        id: string,
    ) => void,
) => {
    const {
        id,
        type,
    } = imagene;

    return (
        <>
            <div>
                {type}
            </div>

            <PluridIconDelete
                atClick={() => handleNotifierObliterate(id)}
            />
        </>
    );
}


export const createSearchTerms = (
    imagenes: Notifier[],
) => {
    const searchTerms = imagenes.map(
        imagene => {
            const {
                id,
                type,
            } = imagene;


            const searchTerm = {
                id,
                data: [
                    type.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}
// #endregion module
