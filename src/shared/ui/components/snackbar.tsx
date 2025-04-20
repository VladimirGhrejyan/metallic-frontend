import { Slide, SlideProps } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~app/providers/store/config/store';
import { hideSnackbar } from '~app/providers/store/lib/snackbar-slice';

export const GlobalSnackbar: React.FC = () => {
    const dispatch = useDispatch();
    const { open, message, severity } = useSelector((state: RootState) => state.snackbar);

    const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        dispatch(hideSnackbar());
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="left" />;
}
