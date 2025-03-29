import { Box } from '@mui/material';
import { ProductsCategoryCreateForm } from '~features/products-category';
import { BackButton } from '~shared/ui/componets/back-button';

export const ProductsCategoryCreatePage = () => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <BackButton />
            <ProductsCategoryCreateForm />
        </Box>
    );
};
