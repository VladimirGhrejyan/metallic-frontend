import react from '@vitejs/plugin-react';
import { PluginOption } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

import { validateEnv } from './validate-env/validate-env.plugin';

export const buildPlugins = (): PluginOption[] => {
    return [
        react(),
        tsconfigPaths(),
        checker({
            typescript: { tsconfigPath: 'tsconfig.app.json' },
        }),
        validateEnv(),
    ];
};
