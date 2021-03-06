// #region imports
    // #region libraries
    import os from 'os';
    import path from 'path';
    // #endregion libraries
// #endregion imports



// #region module
const homeDirectory = os.homedir();

const PERFORMER_CONFIGURATION_FILE = '.performer.config.deon';
const performerConfigurationPath = path.join(
    homeDirectory,
    PERFORMER_CONFIGURATION_FILE
);

const PERFORMER_COOKIE = 'PVTTKN';
// #endregion module



// #region exports
export {
    homeDirectory,

    PERFORMER_CONFIGURATION_FILE,
    performerConfigurationPath,

    PERFORMER_COOKIE,
};
// #endregion exports
