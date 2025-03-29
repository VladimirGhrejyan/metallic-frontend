import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router';

import { authenticatedLayoutRoute } from '../authenticated.route';

// Temporary solution to restrict access to **HOME (/) ** page
const condition = true;

export const homeRoute = createRoute({
    getParentRoute: () => authenticatedLayoutRoute,
    path: '/',
    component: lazyRouteComponent(() => import('~pages/home'), 'HomePage'),
    beforeLoad: () => {
        if (condition) {
            throw redirect({
                to: '/admin',
            });
        }
    },
});
