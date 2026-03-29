import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, IconButton } from '@mui/material';
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
/** Match IconButton width/height so − / input / + align on one line */
const QUANTITY_CONTROL_PX = 40;

export const AddToOrderBlock: FC<IProps> = ({ product }) => {
    const [count, setCount] = useState<number>(MIN_COUNT);
    const dispatch = useDispatch<AppDispatch>();

    const unitPrice = parseFloat(calculateTotalPrice(product.costPrice, product.markup));

    const canDecrement = count > MIN_COUNT;

    const handleDecrement = () => {
        if (canDecrement) {
            setCount((c) => Math.max(MIN_COUNT, c - 1));
        }
    };

    const handleIncrement = () => {
        setCount((c) => c + 1);
    };

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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: 1.5,
                width: '100%',
                minWidth: 0,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    gap: 1,
                    flexWrap: 'nowrap',
                }}
            >
                <IconButton
                    size="small"
                    onClick={handleDecrement}
                    disabled={!canDecrement}
                    aria-label="Decrease quantity"
                    sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        boxSizing: 'border-box',
                        width: QUANTITY_CONTROL_PX,
                        height: QUANTITY_CONTROL_PX,
                        flexShrink: 0,
                        alignSelf: 'center',
                    }}
                >
                    <RemoveIcon fontSize="small" />
                </IconButton>
                <QuantityInput
                    value={count}
                    onChange={setCount}
                    min={MIN_COUNT}
                    sx={{
                        width: 72,
                        flexShrink: 0,
                        alignSelf: 'center',
                        '& .MuiOutlinedInput-root': {
                            height: QUANTITY_CONTROL_PX,
                            minHeight: QUANTITY_CONTROL_PX,
                            boxSizing: 'border-box',
                        },
                        '& .MuiOutlinedInput-input': {
                            py: 0,
                            px: 0.75,
                            height: QUANTITY_CONTROL_PX,
                            boxSizing: 'border-box',
                            lineHeight: `${QUANTITY_CONTROL_PX}px`,
                        },
                    }}
                />
                <IconButton
                    size="small"
                    onClick={handleIncrement}
                    aria-label="Increase quantity"
                    sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        boxSizing: 'border-box',
                        width: QUANTITY_CONTROL_PX,
                        height: QUANTITY_CONTROL_PX,
                        flexShrink: 0,
                        alignSelf: 'center',
                    }}
                >
                    <AddIcon fontSize="small" />
                </IconButton>
            </Box>
            <Button
                variant="contained"
                fullWidth
                size="medium"
                onClick={handleAdd}
                disabled={count < MIN_COUNT}
                sx={{
                    whiteSpace: 'nowrap',
                    py: 1.25,
                    px: 2,
                    display: 'block',
                    lineHeight: 1.2,
                }}
            >
                Add to order
            </Button>
        </Box>
    );
};
