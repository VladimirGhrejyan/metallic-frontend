import { Box } from '@mui/material';
import { Outlet } from '@tanstack/react-router';

export const UnauthenticatedLayout = () => {
    return (
        <Box sx={{ flex: 1, display: 'flex', mt: 20 }}>
            <Outlet />
        </Box>
    );
};
