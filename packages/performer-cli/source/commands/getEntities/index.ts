// #region imports
    // #region libraries
    import {
        GET_SETUP,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        getPerformer,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const getEntities = async (
    type: string,
) => {
    try {
        const performer = await getPerformer();

        if (!performer) {
            console.log('Could not add provider. Not logged in.');
            return;
        }

        const query = await performer.query({
            query: GET_SETUP,
        });

        const response = query.data.getSetup;

        if (!response.status) {
            console.log(`Could not get ${type}. Something went wrong.`);
            return;
        }

        const responseData = response.data[type];

        if (!responseData) {
            console.log(`Could not get ${type}. Something went wrong.`);
        }

        console.log(JSON.stringify(responseData));

        return;
    } catch (error) {
        console.log(`Could not get ${type}. Something went wrong.`);
        return;
    }
}
// #endregion module



// #region exports
export default getEntities;
// #endregion exports
