import { Box } from '@mui/material';
import { FC } from 'react';
import { CreateProductForm } from '~features/admin-products/ui/create-product/create-product.form';
import { BackButton } from '~shared/ui/components';

export const CreateProductPage: FC = () => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <BackButton />
            <CreateProductForm />
        </Box>
    );
};
