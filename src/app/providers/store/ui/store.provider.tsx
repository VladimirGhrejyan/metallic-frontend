import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '../config/store';

interface IProps {
    children: ReactNode;
}

export const StoreProvider: FC<IProps> = (props) => {
    return <Provider store={store} {...props} />;
};
