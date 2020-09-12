// #region imports
    // #region libraries
    import {
        GENERATE_DEPLOYER,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        getPerformer,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const generateDeployer = async (
    id: string | undefined,
    name: string,
    project: string,
    repository: string,
    branch: string,
    path: string,
    file: string,
) => {
    try {
        const performer = await getPerformer();

        if (!performer) {
            console.log('Could not generate deployer. Not logged in.');
            return;
        }

        const input = {
            id,
            name,
            project,
            repository,
            branch,
            path,
            file,
        };

        const mutation = await performer.mutate({
            mutation: GENERATE_DEPLOYER,
            variables: {
                input,
            },
        });

        const response = mutation.data.generateDeployer;

        if (!response.status) {
            console.log('Could not generate deployer. Something went wrong.');
            return;
        }

        console.log(`Generated deployer '${name}'.`);

        return;
    } catch (error) {
        console.log('Could not generate deployer. Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default generateDeployer;
// #endregion exports
