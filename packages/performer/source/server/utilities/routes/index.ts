// #region imports
    // #region libraries
    import express from 'express';
    // #endregion libraries
// #endregion imports



// #region module
export const getRoutes = (
    instance: express.Application,
) => {
    const routes = instance._router.stack           // registered routes
                    .filter((r: any) => r.route)    // take out all the middleware
                    .map((r: any) => r.route.path)  // get all the paths

    return routes;
}
// #endregion module
