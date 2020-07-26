import {
    getOwner,
} from '#server/api/requesters';

import {
    GITHUB_PROVIDER,
} from '#server/data/constants';



const linkRepository = async (
    input: any,
    context: any,
) => {
    const owner = await getOwner(GITHUB_PROVIDER);


    return {
        status: true,
    };
}


export default linkRepository;
