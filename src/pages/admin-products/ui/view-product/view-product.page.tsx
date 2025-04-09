import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { FC } from 'react';
import { productViewRoute } from '~app/providers/router/config/routes';
import { useGetProductByIdQuery } from '~entities/product';
import { ViewProductForm } from '~features/admin-products';
import { BackButton, Loader } from '~shared/ui/componets';

export const ViewProductPage: FC = () => {
    const navigate = useNavigate();
    const { productId } = productViewRoute.useParams();
    const { data } = useGetProductByIdQuery({ id: Number(productId) });

    if (!data) {
        return <Loader />;
    }

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" justifyContent="space-between">
                <BackButton />
                <Button
                    onClick={() => navigate({ to: `/admin/products/${productId}/edit` })}
                    variant="outlined"
                    sx={{ gap: 1, color: 'primary.main', borderRadius: 1 }}
                >
                    <EditIcon />
                    <Typography variant="body1" fontWeight="bold">
                        Edit
                    </Typography>
                </Button>
            </Box>
            <ViewProductForm data={data} />
        </Box>
    );
};
