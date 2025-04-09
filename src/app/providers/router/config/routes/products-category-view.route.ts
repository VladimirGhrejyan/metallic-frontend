import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const productsCategoryViewRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/products-categories/$productCategoryid/view',
    component: lazyRouteComponent(
        () => import('~pages/admin-products-categories'),
        'ViewProductsCategoryPage',
    ),
});
