import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import { useState } from 'react';
import { Sidebar } from 'src/widgets/sidebar';

export const AuthenticatedLayout = () => {
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };
    return (
        <Box>
            <AppBar position="sticky">
                <Toolbar>
                    {!isLargeScreen && (
                        <IconButton
                            onClick={toggleDrawer}
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>
                </Toolbar>
            </AppBar>

            {!isLargeScreen && <Sidebar open={drawerOpen} onClose={toggleDrawer} />}
            <Box component="main" sx={{ display: 'flex', flex: 1 }}>
                {isLargeScreen && (
                    <Box
                        sx={{
                            height: 'calc(100vh - 64px)',
                            top: '64px',
                            position: 'sticky',
                            overflowY: 'auto',
                            p: 2,
                        }}
                    >
                        SIDEBAR
                    </Box>
                )}
                <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};
