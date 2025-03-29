import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const productCategoryCreateRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/products-category/create',
    component: lazyRouteComponent(
        () => import('~pages/products-category-create'),
        'ProductsCategoryCreatePage',
    ),
});
