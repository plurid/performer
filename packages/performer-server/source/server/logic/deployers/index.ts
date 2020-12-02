// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Deployer,
        InputGenerateDeployer,
        InputValueString,
    } from '~server/data/interfaces';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const registerDeployer = async (
    input: InputGenerateDeployer,
) => {
    const {
        id,
        name,
        repository,
        branch,
        path,
        file,
        project,
    } = input;

    const generatedID = id || uuid.generate();

    const deployer: Deployer = {
        id: generatedID,
        name,
        repository,
        branch,
        path,
        file,
        project,
    };

    await database.store(
        'deployer',
        generatedID,
        deployer,
    );

    return deployer;
}


const deregisterDeployer = async (
    input: InputValueString,
) => {
    await database.obliterate(
        'deployer',
        input.value,
    );
}
// #endregion module



// #region exports
export {
    registerDeployer,
    deregisterDeployer,
};
// #endregion exports
