import EditIcon from '@mui/icons-material/Edit';
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { ChangeEvent, FC, MouseEvent } from 'react';
import { GetOrdersApiResponse } from '~entities/order';
import { defaultRowsPerPageOptions } from '~shared/constants';
import { NoData } from '~shared/ui/components';

interface IProps {
    data: GetOrdersApiResponse;
    isDisabled: boolean;
    onPageChange: (
        _: MouseEvent<HTMLElement> | MouseEvent<HTMLButtonElement, MouseEvent> | null,
        newPage: number,
    ) => void;
    onRowsPerPageChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined,
    ) => void;
    page: number;
}

export const OrdersTable: FC<IProps> = ({
    data,
    isDisabled,
    onPageChange,
    page,
    onRowsPerPageChange,
}) => {
    const { items, meta } = data;
    const navigate = useNavigate();

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', opacity: isDisabled ? 0.7 : 1 }}>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: 'primary.main' }}>
                                <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                    ID
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: 'primary.main' }}>
                                <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                    Client
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: 'primary.main' }}>
                                <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                    Items
                                </Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ backgroundColor: 'primary.main' }}>
                                <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                    Actions
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.length ? (
                            items.map((row) => (
                                <TableRow
                                    key={row.id}
                                    onClick={() => navigate({ to: `/admin/orders/${row.id}/view` })}
                                    sx={{
                                        transition: '0.3s',
                                        ':hover': {
                                            backgroundColor: 'background.default',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.client.name}</TableCell>
                                    <TableCell>{row.items.length}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate({ to: `/admin/orders/${row.id}/view` });
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <NoData colSpan={4} />
                        )}
                    </TableBody>
                    <TablePagination
                        disabled={isDisabled || !items.length}
                        count={meta.totalItems}
                        page={page}
                        rowsPerPage={meta.itemsPerPage}
                        onPageChange={onPageChange}
                        rowsPerPageOptions={defaultRowsPerPageOptions}
                        onRowsPerPageChange={onRowsPerPageChange}
                    />
                </Table>
            </TableContainer>
        </Paper>
    );
};
