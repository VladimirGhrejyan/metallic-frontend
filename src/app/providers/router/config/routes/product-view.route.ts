import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const productViewRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/products/$productId/view',
    component: lazyRouteComponent(() => import('~pages/admin-products'), 'ViewProductPage'),
});
