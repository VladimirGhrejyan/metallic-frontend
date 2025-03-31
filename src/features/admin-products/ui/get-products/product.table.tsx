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
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { ChangeEvent, FC, MouseEvent } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { GetProductsApiResponse, useDeleteProductMutation } from '~entities/product';
import { tableHeaderRows } from '~features/admin-products/model/get-products/table.constants';

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
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        textAlign: tableHeader.align,
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {tableHeader.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell sx={{ fontWeight: 'bold' }}>{row.code}</TableCell>
                                <TableCell sx={{ wordBreak: 'break-all' }}>{row.title}</TableCell>
                                <TableCell>{row.categoryId}</TableCell>
                                <TableCell>{row.costPrice}</TableCell>
                                <TableCell>{row.markup}</TableCell>
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
                                        <MdEdit />
                                    </IconButton>
                                    <IconButton
                                        disabled={isDisabled || isLoading}
                                        onClick={() => {
                                            deleteProduct({ id: row.id });
                                        }}
                                        color="error"
                                        size="small"
                                    >
                                        <IoMdTrash />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
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
