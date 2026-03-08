import { authenticatedLayoutRoute } from './authenticated.route.ts';
import { rootRoute } from './root.route.ts';
import {
    adminRoute,
    clientCreateRoute,
    clientUpdateRoute,
    clientViewRoute,
    clientsRoute,
    homeRoute,
    orderCreateRoute,
    orderViewRoute,
    ordersRoute,
    productCategoryCreateRoute,
    productCreateRoute,
    productUpdateRoute,
    productViewRoute,
    productsCategoriesRoute,
    productsCategoryUpdateRoute,
    productsCategoryViewRoute,
    productsRoute,
    signInRoute,
    signUpRoute,
} from './routes';
import { unauthenticatedLayoutRoute } from './unauthenticated.route.ts';

export const routeTree = rootRoute.addChildren([
    authenticatedLayoutRoute.addChildren([
        homeRoute,
        adminRoute.addChildren([
            productsRoute,
            productUpdateRoute,
            productCreateRoute,
            productsCategoriesRoute,
            productsCategoryUpdateRoute,
            productCategoryCreateRoute,
            productViewRoute,
            productsCategoryViewRoute,
            clientsRoute,
            clientCreateRoute,
            clientUpdateRoute,
            clientViewRoute,
            ordersRoute,
            orderCreateRoute,
            orderViewRoute,
        ]),
    ]),
    unauthenticatedLayoutRoute.addChildren([signInRoute, signUpRoute]),
]);
