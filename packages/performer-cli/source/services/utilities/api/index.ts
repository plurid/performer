// #region imports
    // #region external
    import {
        PERFORMER_COOKIE,
    } from '../../../data/constants';

    import {
        client,
    } from '../../graphql';

    import {
        readConfigurationFile,
    } from '../configuration';
    // #endregion external
// #endregion imports



// #region module
const performerCookieFromToken = (
    token: string,
) => {
    return PERFORMER_COOKIE + '=' + token;
}


const getPerformer = async () => {
    const configuration = await readConfigurationFile();

    if (!configuration.token || !configuration.server) {
        return;
    }

    const cookie = performerCookieFromToken(configuration.token);

    const performer = client(
        configuration.server,
        cookie,
    );

    return performer;
}
// #endregion module



// #region exports
export {
    performerCookieFromToken,
    getPerformer,
};
// #endregion exports
