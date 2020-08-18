// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Repositories,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    linkRepository: (
        _: any,
        { input }: any,
        context: Context,
    ) => Repositories.Mutation.linkRepository(
        input,
        context,
    ),
    delinkRepository: (
        _: any,
        { input }: any,
        context: Context,
    ) => Repositories.Mutation.delinkRepository(
        input,
        context,
    ),
};
// #endregion exports
