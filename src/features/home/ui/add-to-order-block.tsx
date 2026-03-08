import { Box, Button, TextField } from '@mui/material';
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

    const handleCountChange = (value: string) => {
        const n = parseInt(value, 10);
        setCount(Number.isNaN(n) || n < 1 ? 1 : n);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 1 }}>
            <TextField
                type="number"
                size="small"
                value={count}
                onChange={(e) => handleCountChange(e.target.value)}
                inputProps={{ min: 1, step: 1 }}
                sx={{ width: 72 }}
                slotProps={{
                    input: {
                        sx: { textAlign: 'center' },
                    },
                }}
            />
            <Button
                size="small"
                variant="contained"
                onClick={handleAdd}
                sx={{ flex: 1, minWidth: 0 }}
            >
                Add to order
            </Button>
        </Box>
    );
};
