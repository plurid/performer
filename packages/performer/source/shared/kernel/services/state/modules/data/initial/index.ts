// #region imports
    // #region external
    import * as Types from '../types';
    // #endregion external
// #endregion imports



// #region module
const initialState: Types.State = {
    activeProviderID: '',
    providers: [],
    imagenes: [],
    repositories: [],
    projects: [],
    secrets: [],
    webhooks: [],
    triggers: [],
    deployers: [],
    builds: [],
    deploys: [],
};
// #endregion module



// #region exports
export default initialState;
// #endregion exports
