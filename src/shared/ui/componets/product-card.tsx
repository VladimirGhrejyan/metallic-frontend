import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { GetProductByIdApiResponse } from '~entities/product';

interface ProductCardProps {
    product: GetProductByIdApiResponse;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    return (
        <Card
            onClick={() => navigate({ to: `/admin/products/${product.id}/edit` })}
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
                image={''} // TODO
                alt={product.title}
                sx={{
                    height: 150,
                }}
            />
            <CardContent sx={{ px: 0 }}>
                <Typography variant="h6" fontWeight="bold">
                    {product.title}
                </Typography>
                <Typography variant="body1">Code: {product.code}</Typography>
                <Box mt={1}>
                    <Typography variant="body1">Cost Price: {product.costPrice}</Typography>
                    <Typography variant="body1">Markup: {product.markup}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
