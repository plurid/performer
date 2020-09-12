// #region imports
    // #region libraries
    import {
        GENERATE_TRIGGER,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        getPerformer,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const generateTrigger = async (
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
            console.log('Could not generate trigger. Not logged in.');
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
            mutation: GENERATE_TRIGGER,
            variables: {
                input,
            },
        });

        const response = mutation.data.generateTrigger;

        if (!response.status) {
            console.log('Could not generate trigger. Something went wrong.');
            return;
        }

        console.log(`Generated trigger '${name}'.`);

        return;
    } catch (error) {
        console.log('Could not generate trigger. Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default generateTrigger;
// #endregion exports
