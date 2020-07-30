import fs from 'fs';

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
    try {
        const triggerPath = path.join(
            triggersPath,
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
