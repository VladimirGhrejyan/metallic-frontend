import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';

interface IProduct {
    code: string;
    title: string;
    costPrice: number;
    markup: number;
    categoryId: number;
    imageUrl?: string;
}

interface ProductCardProps {
    product: IProduct;
}

export const ProductsCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    return (
        <Card
            onClick={() => navigate({ to: `/admin/products/${product.code}/edit` })}
            sx={{
                flex: 1,
                borderRadius: 2,
                boxShadow: 2,
                transition: 'transform 0.1s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.01)',
                    cursor: 'pointer',
                },
            }}
        >
            <CardMedia
                component="img"
                height="150"
                image={product.imageUrl || 'https://via.placeholder.com/300'}
                alt={product.title}
            />
            <CardContent sx={{ px: 0 }}>
                <Typography variant="h6" fontWeight="bold">
                    {product.title}
                </Typography>
                <Typography variant="body1">Code: {product.code}</Typography>
                <Box mt={1}>
                    <Typography variant="body1">Cost Price: ${product.costPrice}</Typography>
                    <Typography variant="body1">Markup: {product.markup}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
