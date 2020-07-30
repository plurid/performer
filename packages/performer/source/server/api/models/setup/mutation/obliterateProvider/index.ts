import {
    promises as fs,
} from 'fs';

import path from 'path';

import {
    Context,
} from '#server/data/interfaces';

import {
    providersPath,
} from '#server/data/constants';



export const deregisterProvider = async (
    id: string,
) => {
    try {
        const providerPath = path.join(
            providersPath,
            id + '.json',
        );

        fs.unlink(providerPath);
    } catch (error) {
        return;
    }
}


const obliterateProvider = async (
    input: any,
    context: Context,
) => {
    const {
        value,
    } = input;

    deregisterProvider(value);

    return {
        status: true,
    };
}


export default obliterateProvider;
