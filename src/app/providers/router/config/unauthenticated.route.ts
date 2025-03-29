import { createRoute } from '@tanstack/react-router';

import { ifTokenExists } from '../lib/check-auth';
import { UnauthenticatedLayout } from '../ui/unauthenticated.layout';
import { rootRoute } from './root.route';

export const unauthenticatedLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'unauthenticated',
    component: UnauthenticatedLayout,
    beforeLoad: () => ifTokenExists(),
});
