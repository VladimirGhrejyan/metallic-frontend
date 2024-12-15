import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { rootRoute } from '../root.route';

export const signInRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/sign-in',
    component: lazyRouteComponent(() => import('~pages/sign-in'), 'SignInPage'),
});
