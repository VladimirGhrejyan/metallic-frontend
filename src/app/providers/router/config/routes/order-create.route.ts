import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const orderCreateRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/orders/create',
    component: lazyRouteComponent(() => import('~pages/create-order'), 'CreateOrderPage'),
});
