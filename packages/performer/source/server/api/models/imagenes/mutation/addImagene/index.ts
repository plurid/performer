import {
    promises as fs,
} from 'fs';
import path from 'path';

import {
    uuid,
} from '@plurid/plurid-functions';

import {
    imagenesPath,
} from '#server/data/constants';

import {
    Imagene,
} from '#server/data/interfaces';



const registerImagene = async (
    imagene: Imagene,
) => {
    const {
        id,
    } = imagene;

    const imagenePath = path.join(
        imagenesPath,
        id + '.json',
    );

    await fs.writeFile(
        imagenePath,
        JSON.stringify(imagene, null, 4),
    );
}


const addImagene = async (
    input: any,
) => {
    const {
        name,
        version,
    } = input;

    const id = uuid.generate();

    const imagene: Imagene = {
        id,
        name,
        version,
        size: 0,
    };

    await registerImagene(imagene);

    return {
        status: true,
    };
}


export default addImagene;
