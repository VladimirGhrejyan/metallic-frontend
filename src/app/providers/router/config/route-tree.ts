import { authenticatedLayoutRoute } from './authenticated.route.ts';
import { rootRoute } from './root.route.ts';
import { adminRoute, homeRoute, signInRoute, signUpRoute } from './routes';
import { unauthenticatedLayoutRoute } from './unauthenticated.route.ts';

export const routeTree = rootRoute.addChildren([
    authenticatedLayoutRoute.addChildren([homeRoute, adminRoute]),
    unauthenticatedLayoutRoute.addChildren([signInRoute, signUpRoute]),
]);
