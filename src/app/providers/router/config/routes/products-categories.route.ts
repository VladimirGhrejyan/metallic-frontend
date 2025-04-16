import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { TProductsCategoriesQueryArgs } from '~pages/admin-products-categories/model/get-product-categories/form.types';
import { cleanedObject } from '~shared/helpers';

import { adminRoute } from './admin.route';

export const productsCategoriesRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/products-categories',
    component: lazyRouteComponent(
        () => import('~pages/admin-products-categories'),
        'GetProductsCategoriesPage',
    ),
    validateSearch: (search: TProductsCategoriesQueryArgs): TProductsCategoriesQueryArgs => {
        return { ...search };
    },
    search: {
        middlewares: [
            ({ search, next }) => {
                const result = next(search);

                return {
                    ...cleanedObject(result),
                };
            },
        ],
    },
});
