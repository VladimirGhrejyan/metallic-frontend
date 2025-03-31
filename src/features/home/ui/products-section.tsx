import { Box, Grid2 } from '@mui/material';
import { GetProductsApiResponse } from '~entities/product';
import { ProductCard } from '~shared/ui/componets';

interface IProps {
    data: GetProductsApiResponse['items'];
}

export const ProductsSection = ({ data }: IProps) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid2 container spacing={4}>
                {data.map((product) => (
                    <Grid2 key={product.code}>
                        <ProductCard product={product} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};
