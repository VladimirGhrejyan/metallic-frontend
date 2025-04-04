import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const productCategoryCreateRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/products-categories/create',
    component: lazyRouteComponent(
        () => import('~pages/admin-products-categories'),
        'CreateProductsCategoryPage',
    ),
});
