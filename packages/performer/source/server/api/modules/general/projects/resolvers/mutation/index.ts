// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Projects,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    generateProject: (
        _: any,
        { input }: any,
        context: Context,
    ) => Projects.Mutation.generateProject(
        input,
    ),
    obliterateProject: (
        _: any,
        { input }: any,
        context: Context,
    ) => Projects.Mutation.obliterateProject(
        input,
        context,
    ),
};
// #endregion exports
