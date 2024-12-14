import { ServerOptions } from 'vite';

export const buildServerOptions = (mode: string): ServerOptions => {
    if (mode === 'production') {
        return {
            host: true,
            port: 8080,
            strictPort: true,
            origin: `http://0.0.0.0:8080`,
        };
    }

    return {
        host: true,
        port: 5173,
    };
};
