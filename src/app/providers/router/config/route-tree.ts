import { rootRoute } from './root.route.ts';
import { adminRoute, homeRoute, signInRoute, signUpRoute } from './routes';

export const routeTree = rootRoute.addChildren([homeRoute, signInRoute, signUpRoute, adminRoute]);
