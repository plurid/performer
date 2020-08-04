import fs from 'fs';

import path from 'path';

import {
    projectsPath,
} from '#server/data/constants';

import {
    Context,
} from '#server/data/interfaces';



const deregisterProject = async (
    id: string,
) => {
    try {
        const projectPath = path.join(
            projectsPath,
            id + '.json',
        );

        if (!fs.existsSync(projectPath)) {
            return;
        }

        fs.promises.unlink(projectPath);
    } catch (error) {
        return;
    }
}


const obliterateProject = async (
    input: any,
    context: Context,
) => {
    const {
        value
    } = input;

    await deregisterProject(value);

    return {
        status: true,
    };
}


export default obliterateProject;
