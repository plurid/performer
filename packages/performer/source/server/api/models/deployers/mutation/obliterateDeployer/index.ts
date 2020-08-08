import fs from 'fs';

import path from 'path';

import {
    deployersPath,
} from '#server/data/constants';

import {
    Context,
} from '#server/data/interfaces';



const deregisterDeployer = async (
    id: string,
) => {
    try {
        const deployerPath = path.join(
            deployersPath,
            id + '.json',
        );

        if (!fs.existsSync(deployerPath)) {
            return;
        }

        fs.promises.unlink(deployerPath);
    } catch (error) {
        return;
    }
}


const obliterateDeployer = async (
    input: any,
    context: Context,
) => {
    const {
        value
    } = input;

    await deregisterDeployer(value);

    return {
        status: true,
    };
}


export default obliterateDeployer;
