import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router';

import { unauthenticatedLayoutRoute } from '../unauthenticated.route';

// Temporary solution to restrict access to **SIGN UP (/sign-up)** page
const condition = true;

export const signUpRoute = createRoute({
    getParentRoute: () => unauthenticatedLayoutRoute,
    path: '/sign-up',
    component: lazyRouteComponent(() => import('~pages/sign-up'), 'SignUpPage'),
    beforeLoad: () => {
        if (condition) {
            throw redirect({
                to: '/sign-in',
            });
        }
    },
});
