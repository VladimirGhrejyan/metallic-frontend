import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import { useState } from 'react';
import { Sidebar } from 'src/widgets/sidebar';
import { Navbar } from '~widgets/navbar';

export const AuthenticatedLayout = () => {
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));

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
                </Toolbar>
            </AppBar>

            {!isLargeScreen && <Sidebar open={drawerOpen} onClose={toggleDrawer} />}
            <Box component="main" sx={{ display: 'flex', flex: 1 }}>
                {isLargeScreen && <Navbar isInDrawer={false} />}
                <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};
