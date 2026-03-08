import { Box, Grid } from '@mui/material';
import { GetProductsApiResponse } from '~entities/product';
import { ProductCard } from '~shared/ui/components';

import { AddToOrderBlock } from './add-to-order-block';

interface IProps {
    data: GetProductsApiResponse['items'];
}

export const ProductsSection = ({ data }: IProps) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
                {data.map((product) => (
                    <Grid key={product.code} size={{ xs: 12, sm: 4, md: 4, lg: 3, xl: 4 }}>
                        <ProductCard
                            product={product}
                            imageLink={`/admin/products/${product.id}/edit`}
                            actions={<AddToOrderBlock product={product} />}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
