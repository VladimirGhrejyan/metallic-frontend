import { authenticatedLayoutRoute } from './authenticated.route.ts';
import { rootRoute } from './root.route.ts';
import {
    adminRoute,
    homeRoute,
    productCategoryCreateRoute,
    productCreateRoute,
    productsCategoryIdEditRoute,
    productsCategoryRoute,
    productsIdEditRoute,
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
            productsIdEditRoute,
            productCreateRoute,
            productsCategoryRoute,
            productsCategoryIdEditRoute,
            productCategoryCreateRoute,
        ]),
    ]),
    unauthenticatedLayoutRoute.addChildren([signInRoute, signUpRoute]),
]);
