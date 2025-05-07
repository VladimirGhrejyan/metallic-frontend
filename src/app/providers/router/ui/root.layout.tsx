import { Box } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import { GlobalSnackbar } from '~shared/ui/components/snackbar';

export const RootLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Outlet />
            <GlobalSnackbar />
        </Box>
    );
};
