import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const clientCreateRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/clients/create',
    component: lazyRouteComponent(() => import('~pages/admin-clients'), 'CreateClientPage'),
});
