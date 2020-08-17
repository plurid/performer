// #region imports
    // #region libraries
    import { AnyAction } from 'redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        graphql,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import client from '#kernel-services/graphql/client';
    import {
        GET_CURRENT_OWNER,
        GET_USAGE_TYPE,
        GET_SETUP,
    } from '#kernel-services/graphql/query';

    import actions from '#kernel-services/state/actions';
    // #endregion external
// #endregion imports



// #region module
/**
 * Get current owner and return true if set.
 *
 * @param setViewOwnerID
 */
const getCurrentOwner = async (
    setViewOwnerID: typeof actions.view.setViewOwnerID,
) => {
    const query = await client.query({
        query: GET_CURRENT_OWNER,
    });

    const response = query.data.getCurrentOwner;

    if (response.status) {
        const owner = graphql.deleteTypenames(
            response.data,
        );

        setViewOwnerID(owner.id);
        return true;
    }

    return;
}


/**
 * Get current owner and return true if set.
 *
 * @param setViewUsageType
 */
const getUsageType = async (
    setViewUsageType: typeof actions.view.setViewUsageType,
) => {
    const query = await client.query({
        query: GET_USAGE_TYPE,
    });

    const response = query.data.getUsageType;

    if (response.status) {
        const usageType = response.data;
        setViewUsageType(usageType);

        switch (usageType) {
            case 'PRIVATE_USAGE':
                return 'private';
        }
    }

    return;
}


/**
 * Get data.
 *
 * @param dispatch
 */
const getSetup = async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
    const dispatchSetActiveProviderID: typeof actions.data.setActiveProviderID = (
        providerID,
    ) => dispatch(
        actions.data.setActiveProviderID(providerID),
    );

    const dispatchSetProviders: typeof actions.data.setProviders = (
        providers,
    ) => dispatch(
        actions.data.setProviders(providers),
    );
    const dispatchSetImagenes: typeof actions.data.setImagenes = (
        imagenes,
    ) => dispatch(
        actions.data.setImagenes(imagenes),
    );
    const dispatchSetRepositories: typeof actions.data.setRepositories = (
        repositories,
    ) => dispatch(
        actions.data.setRepositories(repositories),
    );
    const dispatchSetWebhooks: typeof actions.data.setWebhooks = (
        webhooks,
    ) => dispatch(
        actions.data.setWebhooks(webhooks),
    );
    const dispatchSetProjects: typeof actions.data.setProjects = (
        projects,
    ) => dispatch(
        actions.data.setProjects(projects),
    );
    const dispatchSetSecrets: typeof actions.data.setSecrets = (
        secrets,
    ) => dispatch(
        actions.data.setSecrets(secrets),
    );
    const dispatchSetTriggers: typeof actions.data.setTriggers = (
        triggers,
    ) => dispatch(
        actions.data.setTriggers(triggers),
    );
    const dispatchSetDeployers: typeof actions.data.setDeployers = (
        triggers,
    ) => dispatch(
        actions.data.setDeployers(triggers),
    );
    const dispatchSetBuilds: typeof actions.data.setBuilds = (
        builds,
    ) => dispatch(
        actions.data.setBuilds(builds),
    );
    const dispatchSetDeploys: typeof actions.data.setDeploys = (
        builds,
    ) => dispatch(
        actions.data.setDeploys(builds),
    );


    const setupQuery = await client.query({
        query: GET_SETUP,
    });

    const response = setupQuery.data.getSetup;

    if (!response.status) {
        return;
    }

    const {
        providers,
        imagenes,
        repositories,
        webhooks,
        projects,
        secrets,
        triggers,
        deployers,
        builds,
        deploys,
    } = graphql.deleteTypenames(response.data);

    if (providers.length > 0) {
        dispatchSetActiveProviderID(
            providers[0].id,
        );
    }

    dispatchSetProviders(providers);
    dispatchSetImagenes(imagenes);
    dispatchSetRepositories(repositories);
    dispatchSetWebhooks(webhooks);
    dispatchSetProjects(projects);
    dispatchSetSecrets(secrets);
    dispatchSetTriggers(triggers);
    dispatchSetDeployers(deployers);
    dispatchSetBuilds(builds);
    dispatchSetDeploys(deploys);
}
// #endregion module



// #region exports
export {
    getCurrentOwner,
    getUsageType,
    getSetup,
};
// #endregion exports
