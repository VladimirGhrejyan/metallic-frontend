import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link, useNavigate } from '@tanstack/react-router';
import React from 'react';
import { GetProductByIdApiResponse } from '~entities/product';
import { calculateTotalPrice } from '~shared/helpers';

interface ProductCardProps {
    product: GetProductByIdApiResponse;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const productImageUrl = product.image?.url || 'src/shared/assets/placeholder.png';
    return (
        <Link to={`/admin/products/${product.id}/edit`} style={{ textDecoration: 'none' }}>
            <Card
                onClick={() => navigate({ to: `/admin/products/${product.id}/edit` })}
                sx={{
                    height: 350,
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
                    textDecoration: 'none',
                }}
            >
                <CardMedia
                    component="img"
                    image={productImageUrl}
                    alt={product.title}
                    sx={{
                        height: 180,
                        width: '100%',
                        objectFit: 'cover',
                        backgroundColor: 'background.default',
                    }}
                />
                <CardContent
                    sx={{
                        px: 0,
                        py: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Typography
                        fontWeight="bold"
                        sx={{
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {product.title}
                    </Typography>
                    <Typography variant="body1" noWrap>
                        Code: {product.code}
                    </Typography>
                    <Typography variant="body1">
                        Total Price: {calculateTotalPrice(product.costPrice, product.markup)}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
};
