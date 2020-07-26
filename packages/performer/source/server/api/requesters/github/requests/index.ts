import client from '../requester';

import {
    VIEWER_LOGIN,
} from '../query';



export const getOwner = async () => {
    const query = await client.query({
        query: VIEWER_LOGIN,
    });

    const {
        data,
    } = query;

    if (!data) {
        return;
    }

    const {
        login,
    } = data.viewer;

    return {
        identonym: login,
    };
}
