import merge from 'lodash.merge';

import builds from './builds/resolvers';
import imagenes from './imagenes/resolvers';
import repositories from './repositories/resolvers';
import secrets from './secrets/resolvers';
import setup from './setup/resolvers';
import triggers from './triggers/resolvers';



const generateResolvers = (...imports: any[]) => {
    const resolvers = {};

    merge(
        resolvers,
        ...imports,
    );

    return resolvers;
}

const resolvers = generateResolvers(
    builds,
    imagenes,
    repositories,
    secrets,
    setup,
    triggers,
);


export default resolvers;
