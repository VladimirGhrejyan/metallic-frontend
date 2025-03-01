import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import { useState } from 'react';
import { Sidebar } from 'src/widgets/sidebar';

export const RootLayout = () => {
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
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

            <Box component="main" sx={{ flex: 1, p: 2 }}>
                <Outlet />
            </Box>
        </Box>
    );
};
