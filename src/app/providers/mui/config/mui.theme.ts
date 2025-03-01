import { createTheme } from '@mui/material/styles';

import { colorPalette as palette } from './color-palette';
import { components } from './components';
import { typography } from './typography';

export const muiTheme = createTheme({
    palette,
    typography,
    components,
    spacing: 8,
    shape: {
        borderRadius: 4,
    },
});
