// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Project,
    } from '~server/data/interfaces';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const getProject = async (
    id: string,
): Promise<Project | undefined> => {
    const project = await database.get(
        'project',
        id,
    );

    return project;
}


const registerProject = async (
    name: string,
) => {
    const id = uuid.generate();

    const project: Project = {
        id,
        name,
    };

    await database.store(
        'project',
        id,
        project,
    );

    return project;
}


const deregisterProject = async (
    id: string,
) => {
    try {
        await database.obliterate(
            'project',
            id,
        );
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export {
    getProject,
    registerProject,
    deregisterProject,
};
// #endregion exports
