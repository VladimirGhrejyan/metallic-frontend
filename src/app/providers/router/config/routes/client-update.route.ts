import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const clientUpdateRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/clients/$clientId/edit',
    component: lazyRouteComponent(() => import('~pages/admin-clients'), 'UpdateClientPage'),
});
