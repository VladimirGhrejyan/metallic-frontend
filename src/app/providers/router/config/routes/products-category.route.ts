import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const productsCategoryRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/products-category',
    component: lazyRouteComponent(
        () => import('~pages/admin-products-category'),
        'AdminProductsCategoryPage',
    ),
});
