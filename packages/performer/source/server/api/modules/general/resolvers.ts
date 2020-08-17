// #region imports
    // #region libraries
    import merge from 'lodash.merge';
    // #endregion libraries

    // #region internal
    import setup from './setup/resolvers';
    import imagenes from './imagenes/resolvers';
    import repositories from './repositories/resolvers';
    import projects from './projects/resolvers';
    import secrets from './secrets/resolvers';
    import triggers from './triggers/resolvers';
    import deployers from './deployers/resolvers';
    import builds from './builds/resolvers';
    import deploys from './deploys/resolvers';
    // #endregion internal
// #endregion imports



// #region module
const generateResolvers = (
    ...imports: any[]
) => {
    const resolvers = {};

    merge(
        resolvers,
        ...imports,
    );

    return resolvers;
}

const resolvers = generateResolvers(
    setup,
    imagenes,
    repositories,
    projects,
    secrets,
    triggers,
    deployers,
    builds,
    deploys,
);
// #endregion module



// #region exports
export default resolvers;
// #endregion exports
