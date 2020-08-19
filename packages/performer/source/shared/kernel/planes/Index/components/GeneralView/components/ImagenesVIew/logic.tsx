// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridIconDelete,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import {
        Imagene,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const imageneRowRenderer = (
    imagene: Imagene,
    handleImageneObliterate: (
        id: string,
    ) => void,
) => {
    const {
        id,
        name,
        version,
        size,
    } = imagene;

    return (
        <>
            <div>
                {name}
            </div>

            <div>
                {version}
            </div>

            <div>
                {size}
            </div>

            <PluridIconDelete
                atClick={() => handleImageneObliterate(id)}
            />
        </>
    );
}


export const createSearchTerms = (
    imagenes: Imagene[],
) => {
    const searchTerms = imagenes.map(
        imagene => {
            const {
                id,
                name,
                version,
                size,
            } = imagene;


            const searchTerm = {
                id,
                data: [
                    name.toLowerCase(),
                    version.toLowerCase(),
                    size,
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}
// #endregion module
