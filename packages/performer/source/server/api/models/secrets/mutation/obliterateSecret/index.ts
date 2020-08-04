import fs from 'fs';

import path from 'path';

import {
    secretsPath,
} from '#server/data/constants';

import {
    Context,
} from '#server/data/interfaces';



const deregisterSecret = async (
    id: string,
) => {
    try {
        const secretPath = path.join(
            secretsPath,
            id + '.json',
        );

        if (!fs.existsSync(secretPath)) {
            return;
        }

        fs.promises.unlink(secretPath);
    } catch (error) {
        return;
    }
}


const obliterateSecret = async (
    input: any,
    context: Context,
) => {
    const {
        value,
    } = input;

    deregisterSecret(value);

    return {
        status: true,
    };
}


export default obliterateSecret;
