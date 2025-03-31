import { authenticatedLayoutRoute } from './authenticated.route.ts';
import { rootRoute } from './root.route.ts';
import {
    adminRoute,
    homeRoute,
    productCategoryCreateRoute,
    productCreateRoute,
    productUpdateRoute,
    productsCategoriesRoute,
    productsCategoryUpdateRoute,
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
        ]),
    ]),
    unauthenticatedLayoutRoute.addChildren([signInRoute, signUpRoute]),
]);
