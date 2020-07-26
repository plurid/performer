import {
    promises as fs,
} from 'fs';
import path from 'path';

import {
    uuid,
} from '@plurid/plurid-functions';

import {
    BASE_PATH,
    BASE_PATH_TRIGGERS,
} from '#server/data/constants';



const cleanTriggerName = (
    name: string,
) => {
    return name.replace(/\//, '-');
}

const registerTrigger = async (
    data: any,
) => {
    const {
        id,
        repository,
        branch,
    } = data;

    const triggerName = cleanTriggerName(
        [
            repository,
            branch,
            id,
        ].join('_'),
    );

    const triggerPath = path.join(
        BASE_PATH,
        BASE_PATH_TRIGGERS,
        triggerName + '.json',
    );

    await fs.writeFile(
        triggerPath,
        JSON.stringify(data, null, 4),
    );
}


const addTrigger = async (
    input: any,
) => {
    const {
        id,
        name,
        repository,
        branch,
        path,
    } = input;

    const generatedID = id || uuid.generate();

    const triggerData = {
        id: generatedID,
        name,
        repository,
        branch,
        path,
    };

    await registerTrigger(triggerData);

    return {
        status: true,
    };
}


export default addTrigger;
