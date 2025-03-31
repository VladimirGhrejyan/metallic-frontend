import { Box } from '@mui/material';
import { CreateProductsCategoryForm } from '~features/admin-products-categories';
import { BackButton } from '~shared/ui/componets/back-button';

export const CreateProductsCategoryPage = () => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <BackButton />
            <CreateProductsCategoryForm />
        </Box>
    );
};
