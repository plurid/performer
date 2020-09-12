// #region imports
    // #region libraries
    import {
        OBLITERATE_PROVIDER,
        DELINK_REPOSITORY,
        OBLITERATE_WEBHOOK,
        OBLITERATE_PROJECT,
        OBLITERATE_SECRET,
        OBLITERATE_TRIGGER,
        OBLITERATE_DEPLOYER,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        getPerformer,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const obliterateEntity = async (
    type: string,
    id: string,
) => {
    try {
        const performer = await getPerformer();

        if (!performer) {
            console.log(`Could not obliterate ${type}. Not logged in.`);
            return;
        }

        let mutationType;

        switch (type) {
            case 'provider':
                mutationType = OBLITERATE_PROVIDER;
                break;
            case 'repository':
                mutationType = DELINK_REPOSITORY;
                break;
            case 'webhook':
                mutationType = OBLITERATE_WEBHOOK;
                break;
            case 'project':
                mutationType = OBLITERATE_PROJECT;
                break;
            case 'secret':
                mutationType = OBLITERATE_SECRET;
                break;
            case 'trigger':
                mutationType = OBLITERATE_TRIGGER;
                break;
            case 'deployer':
                mutationType = OBLITERATE_DEPLOYER;
                break;
        }

        if (!mutationType) {
            console.log(`Could not obliterate ${type}. No such type.`);
            return;
        }

        const input = {
            value: id,
        };

        const mutation = await performer.mutate({
            mutation: mutationType,
            variables: {
                input,
            },
        });

        let mutationName;

        switch (type) {
            case 'provider':
                mutationName = 'obliterateProvider';
                break;
            case 'repository':
                mutationName = 'delinkRepository';
                break;
            case 'webhook':
                mutationName = 'obliterateWebhook';
                break;
            case 'project':
                mutationName = 'obliterateProject';
                break;
            case 'secret':
                mutationName = 'obliterateSecret';
                break;
            case 'trigger':
                mutationName = 'obliterateTrigger';
                break;
            case 'deployer':
                mutationName = 'obliterateDeployer';
                break;
        }

        if (!mutationName) {
            console.log(`Could not obliterate ${type}. No such type.`);
            return;
        }

        const response = mutation.data[mutationName];

        if (!response.status) {
            console.log(`Could not obliterate ${type}. Something went wrong.`);
            return;
        }

        console.log(`Obliterated ${type} with id ${id}`);

        return;
    } catch (error) {
        console.log(`Could not obliterate ${type}. Something went wrong.`);
        return;
    }
}
// #endregion module



// #region exports
export default obliterateEntity;
// #endregion exports
