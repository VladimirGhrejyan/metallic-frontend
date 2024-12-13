import { UserConfigFnObject, defineConfig } from 'vite';

import { ENV_PREFIX } from './config/build/constants';
import { buildPlugins } from './config/build/plugins';

export default defineConfig(() => {
    return {
        plugins: buildPlugins(),
        envPrefix: ENV_PREFIX,
    };
}) satisfies UserConfigFnObject;
