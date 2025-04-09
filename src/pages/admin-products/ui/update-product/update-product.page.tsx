import { Box } from '@mui/material';
import { productUpdateRoute } from '~app/providers/router/config/routes/product-update.route';
import { useGetProductByIdQuery } from '~entities/product';
import { UpdateProductForm } from '~features/admin-products';
import { Loader } from '~shared/ui/componets';
import { BackButton } from '~shared/ui/componets/back-button';

export const UpdateProductPage = () => {
    const { productId } = productUpdateRoute.useParams();
    const { data } = useGetProductByIdQuery({ id: Number(productId) });

    if (!data) {
        return <Loader />;
    }

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <BackButton />
            <UpdateProductForm data={data} />
        </Box>
    );
};
