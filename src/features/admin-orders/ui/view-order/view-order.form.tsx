import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~app/providers/store/config/store';
import { type GetOrderByIdApiResponse, useDeleteOrderMutation } from '~entities/order';
import { showSnackbar } from '~entities/snackbar';
import { PageHeader } from '~shared/ui/components';
import { ConfirmationModal } from '~shared/ui/modals';

import { downloadOrderAsXlsx } from './lib/download-order-xlsx';

interface IProps {
    order: GetOrderByIdApiResponse;
}

export const ViewOrderForm: FC<IProps> = ({ order }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleDeleteConfirm = () => {
        deleteOrder({ id: order.id })
            .unwrap()
            .then(() => {
                dispatch(showSnackbar({ message: 'Order deleted', severity: 'success' }));
                navigate({ to: '/admin/orders' });
            })
            .catch(() => {
                dispatch(showSnackbar({ message: 'Failed to delete order', severity: 'error' }));
            })
            .finally(() => setDeleteModalOpen(false));
    };

    const handleDownloadXlsx = () => {
        downloadOrderAsXlsx(order);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1,
                }}
            >
                <PageHeader pageTitle="Order" />
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownloadXlsx}
                    >
                        Download xlsx
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => setDeleteModalOpen(true)}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
            <Typography>
                <strong>Client:</strong> {order.client.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {order.client.taxpayerRegistrationNumber
                    ? `TRN: ${order.client.taxpayerRegistrationNumber}`
                    : ''}
            </Typography>
            <Typography>
                <strong>Items:</strong>
            </Typography>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Code</TableCell>
                            <TableCell align="right">Count</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    {item.productSnapshot?.title ?? item.product?.title ?? '—'}
                                </TableCell>
                                <TableCell>
                                    {item.productSnapshot?.code ?? item.product?.code ?? '—'}
                                </TableCell>
                                <TableCell align="right">{item.count}</TableCell>
                                <TableCell align="right">{item.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ConfirmationModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                isDisabled={isDeleting}
                actionName="Delete"
                actionColor="error"
                callbackFn={handleDeleteConfirm}
            />
        </Box>
    );
};
