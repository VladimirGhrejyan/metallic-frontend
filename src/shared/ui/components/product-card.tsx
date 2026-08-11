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
    const quantityAvailable =
        typeof product.quantityAvailable === 'number' ? product.quantityAvailable : null;
    const isOutOfStock = quantityAvailable === 0;

    const mediaSx = {
        height: 160,
        width: '100%',
        objectFit: 'cover' as const,
        bgcolor: isOutOfStock ? 'grey.200' : 'grey.100',
        ...(isOutOfStock && { opacity: 0.55, filter: 'grayscale(0.35)' }),
    };

    const cardMedia = (
        <CardMedia component="img" image={productImageUrl} alt={product.title} sx={mediaSx} />
    );

    return (
        <Card
            variant="outlined"
            sx={(theme) => ({
                height: '100%',
                minHeight: 300,
                [theme.breakpoints.up('sm')]: { minHeight: 360 },
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                border: '1px solid',
                borderColor: isOutOfStock ? 'error.light' : 'divider',
                bgcolor: isOutOfStock ? 'action.hover' : 'background.paper',
                overflow: 'hidden',
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                '&:hover': {
                    boxShadow: theme.shadows[4],
                    borderColor: isOutOfStock ? 'error.main' : 'primary.light',
                },
            })}
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
                    px: { xs: 1.5, sm: 2 },
                    '&:last-child': { pb: 2 },
                    minWidth: 0,
                }}
            >
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    color={isOutOfStock ? 'text.secondary' : 'text.primary'}
                    sx={(theme) => ({
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.35,
                        mb: 0.5,
                        [theme.breakpoints.up('sm')]: {
                            display: 'block',
                            overflow: 'visible',
                            WebkitLineClamp: 'unset',
                            WebkitBoxOrient: 'unset',
                            textOverflow: 'clip',
                        },
                    })}
                >
                    {product.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.25 }}>
                    {product.code}
                </Typography>
                {quantityAvailable != null ? (
                    <Typography
                        variant="caption"
                        color={isOutOfStock ? 'error.main' : 'text.secondary'}
                        fontWeight={isOutOfStock ? 600 : 400}
                        sx={{ mb: 0.75 }}
                    >
                        {isOutOfStock ? 'Out of stock' : `available: ${quantityAvailable}`}
                    </Typography>
                ) : null}
                <Typography
                    variant="h6"
                    component="p"
                    fontWeight={600}
                    color={isOutOfStock ? 'text.disabled' : 'primary.main'}
                    sx={{ mt: 'auto', pt: 1, lineHeight: 1.2 }}
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
