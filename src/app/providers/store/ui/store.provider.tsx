import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '../config/store';

interface IProps {
    children: ReactNode;
}

export const StoreProvider: FC<IProps> = (props) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {props.children}
            </PersistGate>
        </Provider>
    );
};
