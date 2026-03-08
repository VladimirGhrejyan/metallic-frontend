import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { IAdminOrdersQueryArgs } from '~pages/admin-orders/model/get-orders/admin-orders.types';
import { rowsPerPageMaxOption } from '~shared/constants';
import { cleanedObject } from '~shared/helpers';

import { adminRoute } from './admin.route';

export const ordersRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/orders',
    component: lazyRouteComponent(() => import('~pages/admin-orders'), 'GetOrdersPage'),
    validateSearch: (search: IAdminOrdersQueryArgs): IAdminOrdersQueryArgs => ({
        ...search,
    }),
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
