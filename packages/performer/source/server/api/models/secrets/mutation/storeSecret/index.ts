import {
    promises as fs,
} from 'fs';

import path from 'path';

import {
    uuid,
} from '@plurid/plurid-functions';

import {
    secretsPath,
} from '#server/data/constants';

import {
    SecretStored,
    Context,
} from '#server/data/interfaces';



const registerSecret = async (
    secret: SecretStored,
) => {
    const {
        id,
    } = secret;

    const secretPath = path.join(
        secretsPath,
        id + '.json',
    );

    await fs.writeFile(
        secretPath,
        JSON.stringify(secret, null, 4),
    );
}


const storeSecret = async (
    input: any,
    context: Context,
) => {
    const {
        name,
        value,
        project,
    } = input;

    const id = uuid.generate();
    const secretStored: SecretStored = {
        id,
        name,
        value,
        project,
    };
    registerSecret(secretStored);

    return {
        status: true,
    };
}


export default storeSecret;
