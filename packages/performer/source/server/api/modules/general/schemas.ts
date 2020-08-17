// #region imports
    // #region internal
    import setup from './setup/schemas';
    import imagenes from './imagenes/schemas';
    import repositories from './repositories/schemas';
    import projects from './projects/schemas';
    import secrets from './secrets/schemas';
    import triggers from './triggers/schemas';
    import deployers from './deployers/schemas';
    import builds from './builds/schemas';
    import deploys from './deploys/schemas';
    // #endregion internal
// #endregion imports



// #region exports
export default [
    setup,
    imagenes,
    repositories,
    projects,
    secrets,
    triggers,
    deployers,
    builds,
    deploys,
];
// #endregion exports
