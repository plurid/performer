// #region imports
    // #region libraries
    import syncFS, {
        promises as fs,
    } from 'fs';

    import Deon from '@plurid/deon';
    // #endregion libraries


    // #region external
    import {
        ConfigurationFile,
    } from '../../../data/interfaces';

    import {
        performerConfigurationPath,
    } from '../../../data/constants';
    // #endregion external
// #endregion imports



// #region module
const updateConfigurationFile = async (
    data: Partial<ConfigurationFile>,
) => {
    try {
        const deon = new Deon();

        const exists = syncFS.existsSync(performerConfigurationPath);

        if (!exists) {
            await fs.writeFile(
                performerConfigurationPath,
                '',
            );
        }

        const dataInFile = await fs.readFile(
            performerConfigurationPath,
            'utf-8',
        );
        const deonDataInFile = await deon.parse(dataInFile);

        const newData = {
            ...deonDataInFile,
            ...data,
        };
        const newDataString = deon.stringify(newData);

        await fs.writeFile(
            performerConfigurationPath,
            newDataString,
        );

        return true;
    } catch (error) {
        return false;
    }
}
// #endregion module



// #region exports
export {
    updateConfigurationFile,
};
// #endregion exports
