import {
    promises as fs,
} from 'fs';

import path from 'path';

import {
    triggersPath,
} from '#server/data/constants';

import {
    Context,
} from '#server/data/interfaces';



const deregisterTrigger = async (
    id: string,
) => {
    const triggerPath = path.join(
        triggersPath,
        id + '.json',
    );

    fs.unlink(triggerPath);
}


const obliterateTrigger = async (
    input: any,
    context: Context,
) => {
    const {
        value
    } = input;

    await deregisterTrigger(value);

    return {
        status: true,
    };
}


export default obliterateTrigger;
