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
        const triggerPath = path.join(
            secretsPath,
            id + '.json',
        );

        if (!fs.existsSync(triggerPath)) {
            return;
        }

        fs.promises.unlink(triggerPath);
    } catch (error) {
        return;
    }
}


const obliterateSecret = async (
    input: any,
    context: Context,
) => {
    const {
        id,
    } = input;

    deregisterSecret(id);

    return {
        status: true,
    };
}


export default obliterateSecret;
