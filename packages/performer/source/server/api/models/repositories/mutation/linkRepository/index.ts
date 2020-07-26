import {
    getRepository,
} from '#server/api/requesters';

import {
    GITHUB_PROVIDER,
} from '#server/data/constants';



const linkRepository = async (
    input: any,
    context: any,
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
