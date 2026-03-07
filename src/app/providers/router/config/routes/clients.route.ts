import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { IAdminClientsQueryArgs } from '~pages/admin-clients/model/get-clients/admin-clients.types';
import { rowsPerPageMaxOption } from '~shared/constants';
import { cleanedObject } from '~shared/helpers';

import { adminRoute } from './admin.route';

export const clientsRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: '/clients',
    component: lazyRouteComponent(() => import('~pages/admin-clients'), 'GetClientsPage'),
    validateSearch: (search: IAdminClientsQueryArgs): IAdminClientsQueryArgs => ({
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
