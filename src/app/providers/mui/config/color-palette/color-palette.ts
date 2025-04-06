import { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '../common';

export const colorPalette: PaletteOptions = {
    primary: {
        main: COLORS.PRIMARY.MAIN,
        light: COLORS.PRIMARY.LIGHT,
        dark: COLORS.PRIMARY.DARK,
        contrastText: COLORS.PRIMARY.CONTRAST_TEXT,
    },

    secondary: {
        main: COLORS.SECONDARY.MAIN,
        light: COLORS.SECONDARY.LIGHT,
        dark: COLORS.SECONDARY.DARK,
        contrastText: COLORS.SECONDARY.CONTRAST_TEXT,
    },

    background: {
        default: COLORS.BACKGROUND.DEFAULT,
        paper: COLORS.BACKGROUND.PAPER,
    },

    text: {
        primary: COLORS.TEXT.PRIMARY,
        secondary: COLORS.TEXT.SECONDARY,
    },

    divider: COLORS.DIVIDER,
};
