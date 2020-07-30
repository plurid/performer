import fs from 'fs';

import path from 'path';

import {
    Context,
} from '#server/data/interfaces';

import {
    webhooksPath,
} from '#server/data/constants';



export const deregisterWebhook = async (
    id: string,
) => {
    try {
        const webhookPath = path.join(
            webhooksPath,
            id + '.json',
        );

        if (!fs.existsSync(webhookPath)) {
            return;
        }

        fs.promises.unlink(webhookPath);
    } catch (error) {
        return;
    }
}


const obliterateWebhook = async (
    input: any,
    context: Context,
) => {
    const {
        value,
    } = input;

    deregisterWebhook(value);

    return {
        status: true,
    };
}


export default obliterateWebhook;
