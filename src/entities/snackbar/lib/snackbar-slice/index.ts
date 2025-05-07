import { AlertProps } from '@mui/material';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SnackbarState {
    open: boolean;
    message: string;
    severity: AlertProps['severity'];
}

const initialState: SnackbarState = {
    open: false,
    message: '',
    severity: 'info',
};

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar: (state, action: PayloadAction<Omit<SnackbarState, 'open'>>) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        hideSnackbar: (state) => {
            state.open = false;
            state.message = '';
        },
    },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
