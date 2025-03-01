import { Drawer, DrawerProps, List, ListItem } from '@mui/material';
import { FC } from 'react';

import { listItems } from '../model/list-items';

interface IProps extends DrawerProps {}

export const Sidebar: FC<IProps> = (props) => {
    return (
        <Drawer {...props}>
            <List>
                {listItems.map((props, index) => (
                    <ListItem {...props} key={index} />
                ))}
            </List>
        </Drawer>
    );
};
