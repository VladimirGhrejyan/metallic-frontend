import { UserConfigFnObject, defineConfig } from 'vite';

import { ENV_PREFIX } from './config/build/constants';
import { buildPlugins } from './config/build/plugins';
import { buildServerOptions } from './config/build/server';

export default defineConfig(({ mode }) => {
    return {
        envPrefix: ENV_PREFIX,
        plugins: buildPlugins(),
        server: buildServerOptions(mode),
    };
}) satisfies UserConfigFnObject;
