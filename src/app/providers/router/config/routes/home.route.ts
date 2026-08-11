import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { IProductsQueryArgs } from '~pages/admin-products/model/get-products/admin-products.types';
import {
    HOME_PRODUCTS_DEFAULT_SORT,
    normalizeExcludeOutOfStock,
} from '~pages/admin-products/model/get-products/products-query.defaults';
import { rowsPerPageMaxOption } from '~shared/constants';
import { cleanedObject } from '~shared/helpers';

import { authenticatedLayoutRoute } from '../authenticated.route';

export const homeRoute = createRoute({
    getParentRoute: () => authenticatedLayoutRoute,
    path: '/',
    component: lazyRouteComponent(() => import('~pages/home'), 'HomePage'),
    validateSearch: (search: IProductsQueryArgs): IProductsQueryArgs => {
        return {
            ...search,
            sortBy: search.sortBy ?? HOME_PRODUCTS_DEFAULT_SORT.sortBy,
            order: search.order ?? HOME_PRODUCTS_DEFAULT_SORT.order,
            excludeOutOfStock: normalizeExcludeOutOfStock(search.excludeOutOfStock),
        };
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
