import { createRoute } from '@tanstack/react-router';

import { AuthenticatedLayout } from '../ui/authenticated.layout';
import { rootRoute } from './root.route';

export const authenticatedLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'authenticated',
    component: AuthenticatedLayout,
});
