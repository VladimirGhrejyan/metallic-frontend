import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { FC } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { useDeleteProductCategoryMutation } from '~entities/product-category';
import { GetProductCategoriesApiResponse } from '~entities/product-category/api/product-category';
import { tableHeaderRows } from '~features/admin-products-categories/model/get-products/table.constants';

interface IProps {
    data: GetProductCategoriesApiResponse;
    isDisabled: boolean;
}

export const ProductsCategoriesTable: FC<IProps> = ({ data, isDisabled }) => {
    const navigate = useNavigate();

    const [deleteProductCategory, { isLoading: deleteIsLoading }] =
        useDeleteProductCategoryMutation();

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'hidden',
                opacity: isDisabled ? '0.7' : 1,
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
                                    }}
                                >
                                    {tableHeader.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.items.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell sx={{ fontWeight: 'bold' }}>{row.code}</TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                                    <IconButton
                                        disabled={isDisabled || deleteIsLoading}
                                        onClick={() =>
                                            navigate({
                                                to: `/admin/products-categories/${row.id}/edit`,
                                            })
                                        }
                                        color="primary"
                                        size="small"
                                    >
                                        <MdEdit />
                                    </IconButton>
                                    <IconButton
                                        disabled={isDisabled || deleteIsLoading}
                                        onClick={() => {
                                            deleteProductCategory({ id: row.id });
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
                </Table>
            </TableContainer>
        </Paper>
    );
};
