import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const productsIdEditRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/products/$productId/edit',
    component: lazyRouteComponent(() => import('~pages/products-id-edit'), 'ProductIdEditPage'),
});
