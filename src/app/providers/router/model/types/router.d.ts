import { router } from '../../config/router.ts';

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
