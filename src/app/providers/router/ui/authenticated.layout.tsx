import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import { useState } from 'react';
import { Sidebar } from 'src/widgets/sidebar';
import { MuiCustomLink } from '~shared/ui/overrides/mui-link';

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
                </Toolbar>
            </AppBar>

            {!isLargeScreen && <Sidebar open={drawerOpen} onClose={toggleDrawer} />}
            <Box component="main" sx={{ display: 'flex', flex: 1 }}>
                {isLargeScreen && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            height: 'calc(100vh - 64px)',
                            border: '0px',
                            borderRight: '1px',
                            borderStyle: 'dashed',
                            borderColor: 'primary.light',
                            position: 'sticky',
                            minWidth: '150px',
                            overflowY: 'auto',
                            top: '64px',
                            gap: 2,
                            p: 2,
                        }}
                    >
                        {/* TODO remove */}
                        <MuiCustomLink
                            activeProps={{
                                sx: {
                                    color: 'white',
                                    textDecoration: 'none',
                                    px: 2,
                                    py: 0.5,
                                    width: '100%',
                                    backgroundColor: 'primary.main',
                                    borderRadius: 1,
                                },
                            }}
                            to="/"
                            sx={{
                                px: 2,
                                py: 0.5,
                                width: '100%',
                                textDecoration: 'none',
                            }}
                        >
                            Home
                        </MuiCustomLink>
                        <MuiCustomLink
                            activeProps={{
                                sx: {
                                    color: 'white',
                                    textDecoration: 'none',
                                    px: 2,
                                    py: 0.5,
                                    width: '100%',
                                    backgroundColor: 'primary.main',
                                    borderRadius: 1,
                                },
                            }}
                            to="/admin/products"
                            sx={{
                                px: 2,
                                py: 0.5,
                                width: '100%',
                                textDecoration: 'none',
                            }}
                        >
                            Products
                        </MuiCustomLink>
                        <MuiCustomLink
                            activeProps={{
                                sx: {
                                    color: 'white',
                                    textDecoration: 'none',
                                    px: 2,
                                    py: 0.5,
                                    width: '100%',
                                    backgroundColor: 'primary.main',
                                    borderRadius: 1,
                                },
                            }}
                            to="/admin/products-category"
                            sx={{
                                px: 2,
                                py: 0.5,
                                width: '100%',
                                textDecoration: 'none',
                            }}
                        >
                            Products Category
                        </MuiCustomLink>
                    </Box>
                )}
                <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};
