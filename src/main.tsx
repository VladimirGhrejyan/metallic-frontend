import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '~app/app.tsx';
import { MuiProvider } from '~app/providers/mui';
import { StoreProvider } from '~app/providers/store';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StoreProvider>
            <MuiProvider>
                <App />
            </MuiProvider>
        </StoreProvider>
    </StrictMode>,
);
