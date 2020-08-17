// #region imports
    // #region libraries
    import {
        Express,
    } from 'express';

    import bodyParser from 'body-parser';
    // #endregion libraries

    // #region external
    import {
        HEALTH_CHECK_ENDPOINT,

        Headers,
        ContentTypes,
    } from '#server/data/constants';
    // #endregion external
// #endregion imports



// #region module
const setupMiddleware = async (
    instance: Express,
) => {
    instance.use(
        bodyParser.json(),
    );

    instance.post(
        HEALTH_CHECK_ENDPOINT,
        (request, response, next) => {
            response.setHeader(
                Headers.ContentType,
                ContentTypes.json,
            );

            response.end(
                JSON.stringify(
                    { status: true },
                ),
            );
        },
    );
}
// #endregion module



// #region exports
export default setupMiddleware;
// #endregion exports
