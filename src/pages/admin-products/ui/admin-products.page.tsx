import { Box } from '@mui/material';
import { ProductsTable } from '~features/products';
import { PageHeader } from '~shared/ui/componets';

export const AdminProductsPage = () => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <PageHeader pageTitle="Products" />
            <ProductsTable />
        </Box>
    );
};
