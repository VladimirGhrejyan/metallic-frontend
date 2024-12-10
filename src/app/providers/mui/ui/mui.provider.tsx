import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { FC, ReactNode } from 'react';

import { muiTheme } from '../lib/mui.theme';

interface IProps {
    children: ReactNode;
}

export const MuiProvider: FC<IProps> = ({ children }) => {
    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
