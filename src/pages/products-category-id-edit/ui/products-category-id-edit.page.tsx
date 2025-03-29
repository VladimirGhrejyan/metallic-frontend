import { Box } from '@mui/material';
import { productsCategoryIdEditRoute } from '~app/providers/router/config/routes';
import { PageHeader } from '~shared/ui/componets';
import { BackButton } from '~shared/ui/componets/back-button';

export const ProductCategoryIdEditPage = () => {
    const { productCategoryid } = productsCategoryIdEditRoute.useParams();
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <BackButton />
            <PageHeader pageTitle={`Product Category ID ${productCategoryid} Edit`} />
        </Box>
    );
};
