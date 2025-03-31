import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const productUpdateRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/products/$productId/edit',
    component: lazyRouteComponent(() => import('~pages/admin-products'), 'UpdateProductPage'),
});
