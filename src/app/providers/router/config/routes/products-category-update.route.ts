import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const productsCategoryUpdateRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/products-categories/$productCategoryid/edit',
    component: lazyRouteComponent(
        () => import('~pages/admin-products-categories'),
        'UpdateProductsCategoryPage',
    ),
});
