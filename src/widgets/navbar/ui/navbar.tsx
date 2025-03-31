import { Box } from '@mui/material';
import { FC } from 'react';
import { SignOutButton } from '~shared/ui/componets';
import { MuiCustomLink } from '~shared/ui/overrides/mui-link';

import { navItems } from '../model/nav-items';

interface IProps {
    isInDrawer: boolean;
}

export const Navbar: FC<IProps> = ({ isInDrawer }) => {
    return (
        <Box
            component="nav"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 'calc(100vh - 64px)',
                border: '0px',
                borderRight: isInDrawer ? '0px' : '1px',
                borderStyle: 'dashed',
                borderColor: 'primary.light',
                position: 'sticky',
                minWidth: '150px',
                overflowY: 'auto',
                top: '64px',
                p: 2,
            }}
        >
            <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}
            >
                {navItems.map((item) => (
                    <MuiCustomLink
                        key={item.to}
                        to={item.to}
                        activeProps={{
                            sx: {
                                color: isInDrawer ? 'primary.main' : 'white',
                                textDecoration: 'none',
                                px: 2,
                                py: 0.5,
                                width: '100%',
                                backgroundColor: isInDrawer ? 'white' : 'primary.main',
                                borderRadius: 1,
                            },
                        }}
                        sx={{
                            color: isInDrawer ? 'white' : 'unset',
                            px: 2,
                            py: 0.5,
                            width: '100%',
                            textDecoration: 'none',
                        }}
                    >
                        {item.name}
                    </MuiCustomLink>
                ))}
            </Box>
            <SignOutButton isInDrawer={isInDrawer} />
        </Box>
    );
};
