import { Box, Grid2 } from '@mui/material';
import { ProductsCard } from '~shared/ui/componets';

interface IProduct {
    code: string;
    title: string;
    costPrice: number;
    markup: number;
    categoryId: number;
    imageUrl?: string;
}

const rows: IProduct[] = [
    {
        code: 'iS483DUYJTa_AYC',
        title: 'Product 1',
        costPrice: 100,
        markup: 200,
        categoryId: 1,
        imageUrl: 'https://placehold.co/600x400',
    },
    {
        code: '3P8DCNFv8L8VjUb',
        title: 'Product 2',
        costPrice: 100,
        markup: 200,
        categoryId: 2,
        imageUrl: 'https://placehold.co/600x400',
    },
    {
        code: 'QKXH9A1E8OQcAWd',
        title: 'Product 3',
        costPrice: 100,
        markup: 200,
        categoryId: 2,
        imageUrl: 'https://placehold.co/600x400',
    },
    {
        code: 'R6qnvEPv_h0dhfZ',
        title: 'Product 4',
        costPrice: 100,
        markup: 200,
        categoryId: 3,
        imageUrl: 'https://placehold.co/600x400',
    },
    {
        code: '2MYaS7ng0oIBMb1',
        title: 'Product 5',
        costPrice: 100,
        markup: 200,
        categoryId: 4,
        imageUrl: 'https://placehold.co/600x400',
    },
    {
        code: '3Ct__c6a0zWqqgX',
        title: 'Product 6',
        costPrice: 100,
        markup: 200,
        categoryId: 4,
        imageUrl: 'https://placehold.co/600x400',
    },
    {
        code: 'rWCavsEbHP28psp',
        title: 'Product 7',
        costPrice: 100,
        markup: 200,
        categoryId: 4,
        imageUrl: 'https://placehold.co/600x400',
    },
];

export const ProductsSection = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid2 container spacing={4}>
                {rows.map((product) => (
                    <Grid2 key={product.code}>
                        <ProductsCard product={product} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};
