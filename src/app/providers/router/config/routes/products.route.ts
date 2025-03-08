import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const productsRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/products',
    component: lazyRouteComponent(() => import('~pages/admin-products'), 'AdminProductsPage'),
});
