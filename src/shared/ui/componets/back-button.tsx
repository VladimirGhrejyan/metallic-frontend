import { Box, IconButton, Typography } from '@mui/material';
import { useRouter } from '@tanstack/react-router';
import { IoReturnDownBackSharp } from 'react-icons/io5';

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
                <IoReturnDownBackSharp />
                <Typography variant="body1" fontWeight="bold">
                    Back
                </Typography>
            </IconButton>
        </Box>
    );
};
