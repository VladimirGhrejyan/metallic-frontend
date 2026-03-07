import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { GetProductByIdApiResponse } from '~entities/product';
import { calculateTotalPrice } from '~shared/helpers';

interface ProductCardProps {
    product: GetProductByIdApiResponse;
    actions?: ReactNode;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, actions }) => {
    const productImageUrl = product.image?.url || 'src/shared/assets/placeholder.png';
    return (
        <Card
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
                    flex: 1,
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
                {actions != null ? <Box sx={{ mt: 1 }}>{actions}</Box> : null}
            </CardContent>
        </Card>
    );
};
