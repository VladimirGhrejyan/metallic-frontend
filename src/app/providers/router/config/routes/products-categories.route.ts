import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const productsCategoriesRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/products-categories',
    component: lazyRouteComponent(
        () => import('~pages/admin-products-categories'),
        'GetProductsCategoriesPage',
    ),
});
