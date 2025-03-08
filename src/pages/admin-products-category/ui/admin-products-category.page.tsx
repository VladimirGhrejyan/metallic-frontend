import { Box } from '@mui/material';
import { ProductsCategoryTable } from '~features/products-category';
import { PageHeader } from '~shared/ui/componets';

export const AdminProductsCategoryPage = () => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <PageHeader pageTitle="Products Category" />
            <ProductsCategoryTable />
        </Box>
    );
};
