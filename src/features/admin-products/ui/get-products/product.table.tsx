import DeleteIcon from '@mui/icons-material/Delete';
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
import { GetProductsApiResponse, useDeleteProductMutation } from '~entities/product';
import { calculateTotalPrice } from '~shared/helpers';
import { NoData } from '~shared/ui/componets';

import { tableHeaderRows } from '../../model/get-products/table.constants';

interface IProps {
    data: GetProductsApiResponse;
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

export const ProductsTable: FC<IProps> = ({
    data,
    isDisabled,
    onPageChange,
    page,
    onRowsPerPageChange,
}) => {
    const { items, meta } = data;
    const navigate = useNavigate();

    const [deleteProduct, { isLoading }] = useDeleteProductMutation();

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'hidden',
                opacity: isDisabled || isLoading ? '0.7' : 1,
            }}
        >
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {tableHeaderRows.map((tableHeader) => (
                                <TableCell
                                    key={tableHeader.id}
                                    sx={{ backgroundColor: 'primary.main' }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            textAlign: tableHeader.align,
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {tableHeader.title}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.length ? (
                            items.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Typography
                                            sx={{ wordBreak: 'break-all', fontWeight: 'bold' }}
                                        >{`${row.title} - ${row.code}`}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{row.costPrice}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{row.markup}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {calculateTotalPrice(row.costPrice, row.markup)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                                        <IconButton
                                            disabled={isDisabled || isLoading}
                                            onClick={() =>
                                                navigate({
                                                    to: `/admin/products/${row.id}/edit`,
                                                })
                                            }
                                            color="primary"
                                            size="small"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            disabled={isDisabled || isLoading}
                                            onClick={() => {
                                                deleteProduct({ id: row.id });
                                            }}
                                            color="error"
                                            size="small"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <NoData colSpan={tableHeaderRows.length} />
                        )}
                    </TableBody>
                    <TablePagination
                        disabled={isDisabled || isLoading}
                        count={meta.totalItems}
                        page={page}
                        rowsPerPage={meta.itemsPerPage}
                        onPageChange={onPageChange}
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        onRowsPerPageChange={onRowsPerPageChange}
                    />
                </Table>
            </TableContainer>
        </Paper>
    );
};
