import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Sidebar } from 'src/widgets/sidebar';
import { RootState } from '~app/providers/store/config/store';
import { MuiCustomLink } from '~shared/ui/overrides/mui-link';
import { Navbar } from '~widgets/navbar';

export const AuthenticatedLayout = () => {
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const draft = useSelector((state: RootState) => state.orderDraft);
    const totalItems = draft.reduce((sum: number, item: { count: number }) => sum + item.count, 0);

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
                    <Box sx={{ flex: 1 }} />
                    {totalItems > 0 && (
                        <MuiCustomLink
                            to="/admin/orders/create"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <ShoppingCartIcon />
                            <Typography variant="body1">
                                Order ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                            </Typography>
                        </MuiCustomLink>
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
