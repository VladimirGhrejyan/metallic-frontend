import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { rootRoute } from '../root.route';

export const signUpRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/sign-up',
    component: lazyRouteComponent(() => import('~pages/sign-up'), 'SignUpPage'),
});
