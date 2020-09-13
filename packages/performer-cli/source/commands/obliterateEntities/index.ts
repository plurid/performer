// #region imports
    // #region libraries
    import {
        CLEAR_BUILDS,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        getPerformer,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const obliterateEntities = async (
    type: string,
) => {
    try {
        const performer = await getPerformer();

        if (!performer) {
            console.log(`Could not obliterate ${type}. Not logged in.`);
            return;
        }

        let mutationType;

        switch (type) {
            case 'builds':
                mutationType = CLEAR_BUILDS;
                break;
        }

        if (!mutationType) {
            console.log(`Could not obliterate ${type}. No such type.`);
            return;
        }

        const mutation = await performer.mutate({
            mutation: mutationType,
        });

        let mutationName;

        switch (type) {
            case 'builds':
                mutationName = 'clearBuilds';
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

        console.log(`Obliterated ${type}.`);

        return;
    } catch (error) {
        console.log(`Could not obliterate ${type}. Something went wrong.`);
        return;
    }
}
// #endregion module



// #region exports
export default obliterateEntities;
// #endregion exports
