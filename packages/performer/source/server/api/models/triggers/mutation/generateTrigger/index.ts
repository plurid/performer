import {
    promises as fs,
} from 'fs';

import path from 'path';

import {
    uuid,
} from '@plurid/plurid-functions';

import {
    triggersPath,
} from '#server/data/constants';

import {
    Trigger,
    Context,
} from '#server/data/interfaces';



const registerTrigger = async (
    trigger: Trigger,
) => {
    const {
        id,
    } = trigger;

    const triggerPath = path.join(
        triggersPath,
        id + '.json',
    );

    await fs.writeFile(
        triggerPath,
        JSON.stringify(trigger, null, 4),
    );
}


const generateTrigger = async (
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

    const trigger: Trigger = {
        id: generatedID,
        name,
        repository,
        branch,
        path,
        file,
        project,
    };

    await registerTrigger(trigger);

    return {
        status: true,
    };
}


export default generateTrigger;