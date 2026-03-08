import DeleteIcon from '@mui/icons-material/Delete';
import {
    Autocomplete,
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~app/providers/store/config/store';
import { useGetClientsQuery } from '~entities/client';
import { type GetOrderByIdApiResponse, useCreateOrderMutation } from '~entities/order';
import type { OrderDraftItem } from '~entities/order-draft';
import { clearDraft, removeItem, updateItemCount } from '~entities/order-draft';
import { showSnackbar } from '~entities/snackbar';
import { PageHeader, QuantityInput } from '~shared/ui/components';

export const CreateOrderForm: FC = () => {
    const draft = useSelector((state: RootState) => state.orderDraft);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [clientId, setClientId] = useState<number | null>(null);

    const { data: clientsData } = useGetClientsQuery({
        page: '1',
        itemsPerPage: '100',
    });
    const clients = clientsData?.items ?? [];

    const [createOrder, { isLoading }] = useCreateOrderMutation();

    useEffect(() => {
        if (draft.length === 0) {
            navigate({ to: '/' });
        }
    }, [draft.length, navigate]);

    const handleSubmit = () => {
        if (!clientId) {
            dispatch(
                showSnackbar({
                    message: 'Please select a client',
                    severity: 'error',
                }),
            );
            return;
        }
        createOrder({
            createOrderDto: {
                clientId,
                items: draft.map((item: OrderDraftItem) => ({
                    productId: item.productId,
                    count: item.count,
                })),
            },
        })
            .unwrap()
            .then((order: GetOrderByIdApiResponse) => {
                dispatch(clearDraft());
                dispatch(
                    showSnackbar({
                        message: 'Order created',
                        severity: 'success',
                    }),
                );
                navigate({
                    to: '/admin/orders/$orderId/view',
                    params: { orderId: String(order.id) },
                });
            })
            .catch(() => {
                dispatch(
                    showSnackbar({
                        message: 'Failed to create order',
                        severity: 'error',
                    }),
                );
            });
    };

    if (draft.length === 0) {
        return null;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <PageHeader pageTitle="Create order" />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Code</TableCell>
                            <TableCell align="right">Unit price</TableCell>
                            <TableCell align="right">Count</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {draft.map((item: OrderDraftItem) => {
                            const unitPrice = item.unitPrice ?? 0;
                            const lineTotal = unitPrice * item.count;
                            return (
                                <TableRow key={item.productId}>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.code}</TableCell>
                                    <TableCell align="right">
                                        {unitPrice > 0 ? unitPrice.toFixed(2) : '—'}
                                    </TableCell>
                                    <TableCell align="right">
                                        <QuantityInput
                                            value={item.count}
                                            onChange={(count) =>
                                                dispatch(
                                                    updateItemCount({
                                                        productId: item.productId,
                                                        count,
                                                    }),
                                                )
                                            }
                                            min={1}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        {lineTotal > 0 ? lineTotal.toFixed(2) : '—'}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => dispatch(removeItem(item.productId))}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Typography variant="h6">
                    Order total:{' '}
                    {draft
                        .reduce((sum, item) => sum + (item.unitPrice ?? 0) * item.count, 0)
                        .toFixed(2)}
                </Typography>
            </Box>
            <Box sx={{ maxWidth: 400 }}>
                <Autocomplete
                    options={clients}
                    getOptionLabel={(option: {
                        name: string;
                        taxpayerRegistrationNumber?: string | null;
                    }) =>
                        `${option.name}${option.taxpayerRegistrationNumber ? ` (${option.taxpayerRegistrationNumber})` : ''}`
                    }
                    value={clients.find((c) => c.id === clientId) ?? null}
                    onChange={(_, value) => setClientId(value?.id ?? null)}
                    renderInput={(params) => <TextField {...params} label="Client" required />}
                />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isLoading || !clientId}
                >
                    {isLoading ? 'Creating…' : 'Create order'}
                </Button>
                <Button variant="outlined" onClick={() => navigate({ to: '/' })}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};
