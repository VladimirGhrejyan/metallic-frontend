import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { FC } from 'react';
import { productsCategoryViewRoute } from '~app/providers/router/config/routes';
import { useGetProductCategoryByIdQuery } from '~entities/product-category';
import { ViewProductCategoryForm } from '~features/admin-products-categories';
import { BackButton, Loader } from '~shared/ui/componets';

export const ViewProductsCategoryPage: FC = () => {
    const navigate = useNavigate();
    const { productCategoryid } = productsCategoryViewRoute.useParams();
    const { data } = useGetProductCategoryByIdQuery({ id: Number(productCategoryid) });

    if (!data) {
        return <Loader />;
    }

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" justifyContent="space-between">
                <BackButton />
                <Button
                    onClick={() =>
                        navigate({ to: `/admin/products-categories/${productCategoryid}/edit` })
                    }
                    variant="outlined"
                    sx={{ gap: 1, color: 'primary.main', borderRadius: 1 }}
                >
                    <EditIcon />
                    <Typography variant="body1" fontWeight="bold">
                        Edit
                    </Typography>
                </Button>
            </Box>
            <ViewProductCategoryForm data={data} />
        </Box>
    );
};
