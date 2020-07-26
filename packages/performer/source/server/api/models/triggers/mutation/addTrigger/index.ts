import {
    promises as fs,
} from 'fs';
import path from 'path';

import {
    uuid,
} from '@plurid/plurid-functions';

import {
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
        name,
        repository,
        branch,
    } = data;

    const triggerName = cleanTriggerName(
        [
            id,
            repository,
            branch,
            name,
        ].join('_'),
    );

    const triggerPath = path.join(
        process.cwd(),
        BASE_PATH_TRIGGERS,
        triggerName,
    );

    await fs.writeFile(
        triggerPath,
        JSON.stringify(data),
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
