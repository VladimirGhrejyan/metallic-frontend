import { Box } from '@mui/material';
import { productsIdEditRoute } from '~app/providers/router/config/routes/products-id-edit.route';
import { PageHeader } from '~shared/ui/componets';
import { BackButton } from '~shared/ui/componets/back-button';

export const ProductIdEditPage = () => {
    const { productId } = productsIdEditRoute.useParams();
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <BackButton />
            <PageHeader pageTitle={`Product ID ${productId} Edit`} />
        </Box>
    );
};
