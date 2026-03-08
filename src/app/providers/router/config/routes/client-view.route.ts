import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const clientViewRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/clients/$clientId/view',
    component: lazyRouteComponent(() => import('~pages/admin-clients'), 'ViewClientPage'),
});
