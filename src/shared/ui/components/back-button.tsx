import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Box, IconButton, Typography } from '@mui/material';
import { useRouter } from '@tanstack/react-router';

export const BackButton = () => {
    const router = useRouter();
    return (
        <Box>
            <IconButton
                onClick={() => router.history.back()}
                sx={{
                    gap: 1,
                    color: 'primary.main',
                    borderRadius: 1,
                }}
            >
                <KeyboardReturnIcon />
                <Typography variant="body1" fontWeight="bold">
                    Back
                </Typography>
            </IconButton>
        </Box>
    );
};
