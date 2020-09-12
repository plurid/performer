// #region imports
    // #region libraries
    import {
        LINK_REPOSITORY,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        getPerformer,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const linkRepository = async (
    name: string,
) => {
    try {
        const performer = await getPerformer();

        if (!performer) {
            console.log('Could not link repository. Not logged in.');
            return;
        }

        const input = {
            name,
        };

        const mutation = await performer.mutate({
            mutation: LINK_REPOSITORY,
            variables: {
                input,
            },
        });

        const response = mutation.data.linkRepository;

        return;
    } catch (error) {
        console.log('Could not link repository. Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default linkRepository;
// #endregion exports
