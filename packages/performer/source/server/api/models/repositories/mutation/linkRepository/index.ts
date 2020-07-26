import {
    GITHUB_PROVIDER,
} from '#server/data/constants';

import {
    Context,
} from '#server/data/interfaces';

import {
    getRepository,
} from '#server/api/requesters';



const linkRepository = async (
    input: any,
    context: Context,
) => {
    const {
        url,
        name,
    } = input;

    await getRepository(
        GITHUB_PROVIDER,
        url,
        name,
    );

    return {
        status: true,
    };
}


export default linkRepository;
