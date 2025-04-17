import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    IconButton,
    Typography,
} from '@mui/material';
import { FC } from 'react';

interface IProps extends DialogProps {
    isDisabled: boolean;
    actionName: 'Delete' | 'Update';
    callbackFn: () => void;
    onClose: () => void;
}

export const ConfirmationModal: FC<IProps> = ({
    actionName,
    callbackFn,
    open,
    onClose,
    isDisabled,
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth={'xs'} fullWidth>
            <DialogTitle
                component={'div'}
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Typography variant="h5" fontWeight="bold">
                    Confirmation
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Typography variant="h6">Please confirm your action.</Typography>
            </DialogContent>
            <DialogActions sx={{ paddingX: 3, paddingY: 2 }}>
                <Button
                    disabled={isDisabled}
                    onClick={callbackFn}
                    variant="contained"
                    color="error"
                >
                    {actionName}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
