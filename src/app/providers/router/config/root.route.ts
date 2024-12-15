import { createRootRoute } from '@tanstack/react-router';

import { RootLayout } from '../ui/root.layout.tsx';

export const rootRoute = createRootRoute({
    component: RootLayout,
});
