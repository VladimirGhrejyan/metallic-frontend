import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const productCreateRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/products/create',
    component: lazyRouteComponent(() => import('~pages/admin-products'), 'CreateProductPage'),
});
