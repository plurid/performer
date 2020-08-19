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
    } from '#server/data/interfaces';
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

    // const deployerPath = path.join(
    //     deployersPath,
    //     id + '.json',
    // );

    // await fs.writeFile(
    //     deployerPath,
    //     JSON.stringify(deployer, null, 4),
    // );
}


const deregisterDeployer = async (
    input: InputValueString,
) => {
    try {
        // const deployerPath = path.join(
        //     deployersPath,
        //     id + '.json',
        // );

        // if (!fs.existsSync(deployerPath)) {
        //     return;
        // }

        // fs.promises.unlink(deployerPath);
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export {
    registerDeployer,
    deregisterDeployer,
};
// #endregion exports
