import { TypographyOptions } from '@mui/material/styles/createTypography';

export const typography: TypographyOptions = {
    fontFamily: "'Roboto', 'Arial', sans-serif",

    h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
    },

    h2: {
        fontSize: '2rem',
        fontWeight: 600,
    },

    body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
        '@media (max-width:1024px)': {
            fontSize: '1.25rem',
        },
    },

    body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
    },
};
