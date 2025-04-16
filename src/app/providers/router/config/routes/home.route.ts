import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { IProductsQueryArgs } from '~pages/admin-products/model/get-products/admin-products.types';
import { rowsPerPageMaxOption } from '~shared/constants';
import { cleanedObject } from '~shared/helpers';

import { authenticatedLayoutRoute } from '../authenticated.route';

export const homeRoute = createRoute({
    getParentRoute: () => authenticatedLayoutRoute,
    path: '/',
    component: lazyRouteComponent(() => import('~pages/home'), 'HomePage'),
    validateSearch: (search: IProductsQueryArgs): IProductsQueryArgs => {
        return { ...search };
    },
    search: {
        middlewares: [
            ({ search, next }) => {
                const result = next(search);

                return {
                    ...cleanedObject(result),
                    itemsPerPage:
                        result.itemsPerPage && result.itemsPerPage > rowsPerPageMaxOption
                            ? rowsPerPageMaxOption
                            : result.itemsPerPage,
                };
            },
        ],
    },
});
