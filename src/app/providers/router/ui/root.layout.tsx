import { Box } from '@mui/material';
import { Outlet } from '@tanstack/react-router';

export const RootLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Outlet />
        </Box>
    );
};
