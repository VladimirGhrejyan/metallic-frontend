import { authenticatedLayoutRoute } from './authenticated.route.ts';
import { rootRoute } from './root.route.ts';
import {
    adminRoute,
    homeRoute,
    productsCategoryRoute,
    productsRoute,
    signInRoute,
    signUpRoute,
} from './routes';
import { unauthenticatedLayoutRoute } from './unauthenticated.route.ts';

export const routeTree = rootRoute.addChildren([
    authenticatedLayoutRoute.addChildren([
        homeRoute,
        adminRoute.addChildren([productsRoute, productsCategoryRoute]),
    ]),
    unauthenticatedLayoutRoute.addChildren([signInRoute, signUpRoute]),
]);
