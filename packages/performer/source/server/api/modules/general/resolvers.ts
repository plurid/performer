import merge from 'lodash.merge';

import setup from './setup/resolvers';
import imagenes from './imagenes/resolvers';
import repositories from './repositories/resolvers';
import projects from './projects/resolvers';
import secrets from './secrets/resolvers';
import triggers from './triggers/resolvers';
import deployers from './deployers/resolvers';
import builds from './builds/resolvers';
import deploys from './deploys/resolvers';



const generateResolvers = (...imports: any[]) => {
    const resolvers = {};

    merge(
        resolvers,
        ...imports,
    );

    return resolvers;
}

const resolvers = generateResolvers(
    setup,
    imagenes,
    repositories,
    projects,
    secrets,
    triggers,
    deployers,
    builds,
    deploys,
);


export default resolvers;
