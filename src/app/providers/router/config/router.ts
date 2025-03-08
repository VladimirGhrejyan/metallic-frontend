import { createRouter } from '@tanstack/react-router';

import { routeTree } from './route-tree.ts';

export const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
});
