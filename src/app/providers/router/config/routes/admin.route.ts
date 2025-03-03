import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { authenticatedLayoutRoute } from '../authenticated.route';

export const adminRoute = createRoute({
    getParentRoute: () => authenticatedLayoutRoute,
    path: '/admin',
    component: lazyRouteComponent(() => import('~pages/admin'), 'AdminPage'),
});
