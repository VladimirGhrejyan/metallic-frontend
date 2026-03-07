import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~app/providers/store/config/store';
import { addItem } from '~entities/order-draft';
import { GetProductByIdApiResponse } from '~entities/product';
import { showSnackbar } from '~entities/snackbar';

interface IProps {
    product: GetProductByIdApiResponse;
}

export const AddToOrderBlock: FC<IProps> = ({ product }) => {
    const [count, setCount] = useState<number>(1);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleAdd = () => {
        dispatch(
            addItem({
                productId: product.id,
                count,
                title: product.title,
                code: product.code,
            }),
        );
        dispatch(
            showSnackbar({
                message: `Added ${product.title} x${count} to order`,
                severity: 'success',
            }),
        );
    };

    const handleEditClick = () => {
        navigate({ to: `/admin/products/${product.id}/edit` });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">Qty:</Typography>
                <input
                    type="number"
                    min={1}
                    value={count}
                    onChange={(e) => setCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    style={{
                        width: 56,
                        padding: '4px 8px',
                        borderRadius: 4,
                        border: '1px solid #ccc',
                    }}
                />
                <Button size="small" variant="contained" onClick={handleAdd} sx={{ flex: 1 }}>
                    Add to order
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    cursor: 'pointer',
                }}
                onClick={handleEditClick}
            >
                <IconButton size="small" color="primary" aria-label="Edit product">
                    <EditIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" component="span">
                    Edit
                </Typography>
            </Box>
        </Box>
    );
};
