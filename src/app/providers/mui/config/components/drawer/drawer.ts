import { Components } from '@mui/material/styles';

import { COLORS } from '../../common';

export const drawer: Components['MuiDrawer'] = {
    styleOverrides: {
        paper: {
            backgroundColor: COLORS.PRIMARY.DARK,
            color: COLORS.PRIMARY.CONTRAST_TEXT,
        },
    },
};
