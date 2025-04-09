import { Box } from '@mui/material';
import { productsCategoryUpdateRoute } from '~app/providers/router/config/routes';
import { useGetProductCategoryByIdQuery } from '~entities/product-category';
import { UpdateProductCategoryForm } from '~features/admin-products-categories';
import { Loader } from '~shared/ui/componets';
import { BackButton } from '~shared/ui/componets/back-button';

export const UpdateProductsCategoryPage = () => {
    const { productCategoryid } = productsCategoryUpdateRoute.useParams();
    const { data } = useGetProductCategoryByIdQuery({ id: Number(productCategoryid) });

    if (!data) {
        return <Loader />;
    }

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <BackButton />
            <UpdateProductCategoryForm data={data} />
        </Box>
    );
};
