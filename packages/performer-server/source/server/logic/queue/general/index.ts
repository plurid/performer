// #region imports
    // #region external
    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
export const removeFromQueue = async (
    id: string,
) => {
    await database.obliterate(
        'buildqueue',
        id,
    );
}
// #endregion module
