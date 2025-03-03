import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { unauthenticatedLayoutRoute } from '../unauthenticated.route';

export const signInRoute = createRoute({
    getParentRoute: () => unauthenticatedLayoutRoute,
    path: '/sign-in',
    component: lazyRouteComponent(() => import('~pages/sign-in'), 'SignInPage'),
});
