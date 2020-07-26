import merge from 'lodash.merge';

import builds from './builds/resolvers';
import repositories from './repositories/resolvers';
import secrets from './secrets/resolvers';
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
    repositories,
    secrets,
    triggers,
);


export default resolvers;
