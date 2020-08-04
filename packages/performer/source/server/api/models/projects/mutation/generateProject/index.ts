import {
    promises as fs,
} from 'fs';

import path from 'path';

import {
    uuid,
} from '@plurid/plurid-functions';

import {
    projectsPath,
} from '#server/data/constants';

import {
    Project,
} from '#server/data/interfaces';



const registerProject = async (
    project: Project,
) => {
    const {
        id,
    } = project;

    const projectPath = path.join(
        projectsPath,
        id + '.json',
    );

    await fs.writeFile(
        projectPath,
        JSON.stringify(project, null, 4),
    );
}


const generateProject = async (
    input: any,
) => {
    const {
        name,
    } = input;

    const id = uuid.generate();

    const project: Project = {
        id,
        name,
    };

    await registerProject(project);

    return {
        status: true,
    };
}


export default generateProject;
