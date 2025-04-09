import { Box } from '@mui/material';
import { FC } from 'react';
import { CreateProductsCategoryForm } from '~features/admin-products-categories';
import { BackButton } from '~shared/ui/componets/back-button';

export const CreateProductsCategoryPage: FC = () => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <BackButton />
            <CreateProductsCategoryForm />
        </Box>
    );
};
