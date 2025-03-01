import { Components } from '@mui/material/styles';

export const button: Components['MuiButton'] = {
    styleOverrides: {
        root: {
            borderRadius: '4px',
            textTransform: 'none',
        },

        contained: {
            boxShadow: 'none',
            '&:hover': {
                boxShadow: 'none',
            },
        },
    },
};
