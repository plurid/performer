// #region imports
    // #region libraries
    import {
        GENERATE_PROJECT
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        getPerformer,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const generateProject = async (
    name: string,
) => {
    try {
        const performer = await getPerformer();

        if (!performer) {
            console.log('Could not generate project. Not logged in.');
            return;
        }

        const input = {
            value: name,
        };

        const mutation = await performer.mutate({
            mutation: GENERATE_PROJECT,
            variables: {
                input,
            },
        });

        const response = mutation.data.generateProject;

        if (!response.status) {
            console.log('Could not generate project. Something went wrong.');
            return;
        }

        console.log(`Generated project '${name}'.`);

        return;
    } catch (error) {
        console.log('Could not generate project. Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default generateProject;
// #endregion exports
