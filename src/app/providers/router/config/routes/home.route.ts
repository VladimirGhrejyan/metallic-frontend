import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { authenticatedLayoutRoute } from '../authenticated.route';

export const homeRoute = createRoute({
    getParentRoute: () => authenticatedLayoutRoute,
    path: '/',
    component: lazyRouteComponent(() => import('~pages/home'), 'HomePage'),
});
