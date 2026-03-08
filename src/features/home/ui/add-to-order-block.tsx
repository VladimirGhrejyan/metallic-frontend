import { Box, Button } from '@mui/material';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~app/providers/store/config/store';
import { addItem } from '~entities/order-draft';
import { GetProductByIdApiResponse } from '~entities/product';
import { showSnackbar } from '~entities/snackbar';
import { calculateTotalPrice } from '~shared/helpers';
import { QuantityInput } from '~shared/ui/components';

interface IProps {
    product: GetProductByIdApiResponse;
}

const MIN_COUNT = 1;

export const AddToOrderBlock: FC<IProps> = ({ product }) => {
    const [count, setCount] = useState<number>(MIN_COUNT);
    const dispatch = useDispatch<AppDispatch>();

    const unitPrice = parseFloat(calculateTotalPrice(product.costPrice, product.markup));

    const handleAdd = () => {
        const qty = count >= MIN_COUNT ? count : MIN_COUNT;
        dispatch(
            addItem({
                productId: product.id,
                count: qty,
                title: product.title,
                code: product.code,
                unitPrice,
            }),
        );
        dispatch(
            showSnackbar({
                message: `Added ${product.title} x${qty} to order`,
                severity: 'success',
            }),
        );
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 1 }}>
            <QuantityInput value={count} onChange={setCount} min={MIN_COUNT} />
            <Button
                size="small"
                variant="contained"
                onClick={handleAdd}
                disabled={count < MIN_COUNT}
                sx={{ flex: 1, minWidth: 0 }}
            >
                Add to order
            </Button>
        </Box>
    );
};
