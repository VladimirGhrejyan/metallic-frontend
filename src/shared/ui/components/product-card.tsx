import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import React, { ReactNode } from 'react';
import { GetProductByIdApiResponse } from '~entities/product';
import { calculateTotalPrice } from '~shared/helpers';

interface ProductCardProps {
    product: GetProductByIdApiResponse;
    actions?: ReactNode;
    /** When set, the product image links to this path (e.g. edit page). */
    imageLink?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, actions, imageLink }) => {
    const productImageUrl = product.image?.url || 'src/shared/assets/placeholder.png';
    const totalPrice = calculateTotalPrice(product.costPrice, product.markup);

    const mediaSx = {
        height: 160,
        width: '100%',
        objectFit: 'cover' as const,
        bgcolor: 'grey.100',
    };

    const cardMedia = (
        <CardMedia component="img" image={productImageUrl} alt={product.title} sx={mediaSx} />
    );

    return (
        <Card
            variant="outlined"
            sx={{
                height: '100%',
                minHeight: 320,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderColor: 'primary.light',
                },
            }}
        >
            {imageLink != null ? (
                <Link
                    to={imageLink}
                    style={{ display: 'block', cursor: 'pointer' }}
                    preload="intent"
                >
                    {cardMedia}
                </Link>
            ) : (
                cardMedia
            )}
            <CardContent
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    py: 2,
                    px: 2,
                    '&:last-child': { pb: 2 },
                }}
            >
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    color="text.primary"
                    sx={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.35,
                        mb: 0.5,
                    }}
                >
                    {product.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                    {product.code}
                </Typography>
                <Typography
                    variant="body1"
                    fontWeight={600}
                    color="primary.main"
                    sx={{ mt: 'auto', pt: 1 }}
                >
                    {totalPrice}
                </Typography>
                {actions != null ? (
                    <Box
                        component="div"
                        sx={{
                            mt: 1.5,
                            pt: 1.5,
                            borderTop: 1,
                            borderColor: 'divider',
                        }}
                    >
                        {actions}
                    </Box>
                ) : null}
            </CardContent>
        </Card>
    );
};
