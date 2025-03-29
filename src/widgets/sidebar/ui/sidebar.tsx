import { Drawer, DrawerProps } from '@mui/material';
import { FC } from 'react';
import { Navbar } from '~widgets/navbar';

interface IProps extends DrawerProps {}

export const Sidebar: FC<IProps> = (props) => {
    return (
        <Drawer {...props}>
            <Navbar isInDrawer={true} />
        </Drawer>
    );
};
