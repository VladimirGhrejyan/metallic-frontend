import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { unauthenticatedLayoutRoute } from '../unauthenticated.route';

export const signUpRoute = createRoute({
    getParentRoute: () => unauthenticatedLayoutRoute,
    path: '/sign-up',
    component: lazyRouteComponent(() => import('~pages/sign-up'), 'SignUpPage'),
});
