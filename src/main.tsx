import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '~app/app.tsx';
import { MuiProvider } from '~app/providers/mui';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MuiProvider>
            <App />
        </MuiProvider>
    </StrictMode>,
);
