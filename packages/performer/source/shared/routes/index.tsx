import React from 'react';

import {
    PluridRoute,
} from '@plurid/plurid-data';

import IndexPagePlane from '../kernel/planes/Index/Page';
import NotFoundPlane from '../kernel/planes/NotFound';

import Head from '../kernel/components/Head';

import Home from '#kernel-containers/Home';



const indexRoute: PluridRoute = {
    value: '/',
    exterior: {
        kind: 'react',
        element: Home,
    },
    spaces: [
        {
            value: 'default',
            universes: [
                {
                    value: 'default',
                    clusters: [
                        {
                            value: 'default',
                            planes: [
                                {
                                    value: '/page',
                                    component: {
                                        kind: 'react',
                                        element: IndexPagePlane,
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}


const notFoundRoute: PluridRoute = {
    value: '/not-found',
    exterior: {
        kind: 'react',
        element: () => (
            <Head
                title="not found · performer"
            />
        ),
    },
    spaces: [
        {
            value: 'default',
            universes: [
                {
                    value: 'default',
                    clusters: [
                        {
                            value: 'default',
                            planes: [
                                {
                                    value: '/',
                                    component: {
                                        kind: 'react',
                                        element: NotFoundPlane,
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};


const routes: PluridRoute[] = [
    indexRoute,
    notFoundRoute,
];


export default routes;
