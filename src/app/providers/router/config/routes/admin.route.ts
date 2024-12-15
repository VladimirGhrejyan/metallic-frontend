import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { rootRoute } from '../root.route';

export const adminRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin',
    component: lazyRouteComponent(() => import('~pages/admin'), 'AdminPage'),
});
