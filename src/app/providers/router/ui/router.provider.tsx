import { RouterProvider as TanstackRouterProvider } from '@tanstack/react-router';

import { router } from '../config/router';

export const RouterProvider = () => {
    return <TanstackRouterProvider router={router} />;
};
