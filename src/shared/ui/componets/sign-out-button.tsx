import { Button, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { ImExit } from 'react-icons/im';
import { StorageKeys, storage } from '~shared/lib/storage';

interface IProps {
    isInDrawer: boolean;
}

export const SignOutButton = ({ isInDrawer }: IProps) => {
    const handleSignOut = () => {
        storage.remove(StorageKeys.ACCESS_TOKEN);
        navigate({ to: '/sign-in' });
    };

    const navigate = useNavigate();
    return (
        <Button
            variant="outlined"
            sx={{
                gap: 1,
                color: isInDrawer ? 'white' : 'primary.main',
                borderRadius: 1,
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
            }}
            onClick={handleSignOut}
        >
            <ImExit size={20} />
            <Typography variant="body1" fontWeight="bold">
                Sign Out
            </Typography>
        </Button>
    );
};
