import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { adminRoute } from './admin.route';

export const productsCategoryIdEditRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/products-category/$productCategoryid/edit',
    component: lazyRouteComponent(
        () => import('~pages/products-category-id-edit'),
        'ProductCategoryIdEditPage',
    ),
});
