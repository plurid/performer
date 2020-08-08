import {
    promises as fs,
} from 'fs';

import path from 'path';

import {
    uuid,
} from '@plurid/plurid-functions';

import {
    deployersPath,
} from '#server/data/constants';

import {
    Deployer,
    Context,
} from '#server/data/interfaces';



const registerDeployer = async (
    deployer: Deployer,
) => {
    const {
        id,
    } = deployer;

    const deployerPath = path.join(
        deployersPath,
        id + '.json',
    );

    await fs.writeFile(
        deployerPath,
        JSON.stringify(deployer, null, 4),
    );
}


const generateDeployer = async (
    input: any,
    conext: Context,
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

    await registerDeployer(deployer);

    return {
        status: true,
    };
}


export default generateDeployer;
