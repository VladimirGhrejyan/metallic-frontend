import { FC } from 'react';

export const App: FC = () => {
    return <h1>{import.meta.env.APP_TITLE}</h1>;
};
