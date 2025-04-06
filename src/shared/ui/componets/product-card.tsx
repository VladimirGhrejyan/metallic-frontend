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
                width: 300,
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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
                image={product.image ? product.image.url : '/shared/assets/placeholder.png'}
                alt={product.title}
                sx={{
                    height: 180,
                    width: '100%',
                    objectFit: 'cover',
                    backgroundColor: 'background.default',
                }}
            />
            <CardContent sx={{ px: 0, py: 1 }}>
                <Typography
                    fontWeight="bold"
                    sx={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {product.title}
                </Typography>
                <Typography variant="body1" noWrap>
                    Code: {product.code}
                </Typography>
                <Box mt={1}>
                    <Typography variant="body1">Cost Price: {product.costPrice}</Typography>
                    <Typography variant="body1">Markup: {product.markup}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
