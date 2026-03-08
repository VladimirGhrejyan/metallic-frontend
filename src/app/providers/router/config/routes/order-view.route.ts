import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const orderViewRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/orders/$orderId/view',
    component: lazyRouteComponent(() => import('~pages/admin-orders'), 'ViewOrderPage'),
});
