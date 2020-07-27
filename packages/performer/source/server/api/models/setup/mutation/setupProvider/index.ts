import {
    promises as fs,
} from 'fs';
import path from 'path';

import {
    uuid,
} from '@plurid/plurid-functions';

import {
    Context,
    Provider,
    CodeProvider,
} from '#server/data/interfaces';

import {
    providersPath,
} from '#server/data/constants';



const registerProvider = async (
    type: CodeProvider,
    token: string,
    name: string,
) => {
    const id = uuid.generate();

    const provider: Provider = {
        id,
        type,
        token,
        name,
    };

    const providerPath = path.join(
        providersPath,
        id + '.json',
    );

    await fs.writeFile(
        providerPath,
        JSON.stringify(provider, null, 4),
    );
}


const setupProvider = async (
    input: any,
    context: Context,
) => {
    const {
        provider,
        token,
        name
    } = input;

    registerProvider(
        provider,
        token,
        name,
    );

    return {
        status: true,
    };
}


export default setupProvider;
