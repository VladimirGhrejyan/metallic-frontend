import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { FC } from 'react';
import { GetOrderByIdApiResponse } from '~entities/order';
import { PageHeader } from '~shared/ui/components';

interface IProps {
    order: GetOrderByIdApiResponse;
}

export const ViewOrderForm: FC<IProps> = ({ order }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
            <PageHeader pageTitle="Order" />
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
        </Box>
    );
};
