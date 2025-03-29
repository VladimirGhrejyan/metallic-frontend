import {
    IconButton,
    Paper,
    Skeleton,
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
import {
    useDeleteProductCategoryMutation,
    useGetProductCategoriesQuery,
} from '~entities/product-category';

const tableHeaderRows = [
    {
        id: 'id',
        title: 'Id',
    },
    {
        id: 'code',
        title: 'Code',
    },
    {
        id: 'title',
        title: 'Title',
    },
    {
        id: 'created-at',
        title: 'Created At',
    },
    {
        id: 'upadted-at',
        title: 'Updated At',
    },
    {
        id: 'actions',
        title: 'Actions',
    },
];

export const ProductsCategoryTable: FC = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetProductCategoriesQuery();
    const [deleteProductCategory, { isLoading: deleteIsLoading }] =
        useDeleteProductCategoryMutation();

    if (!data) {
        return <Skeleton />;
    }

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'hidden',
                opacity: isLoading || deleteIsLoading ? '0.5' : 1,
            }}
        >
            <TableContainer sx={{ maxHeight: '540px', overflowX: 'auto' }}>
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
                                    }}
                                >
                                    {tableHeader.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{row.code}</TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() =>
                                            navigate({
                                                to: `/admin/products-category/${row.code}/edit`,
                                            })
                                        }
                                        color="primary"
                                        size="small"
                                    >
                                        <MdEdit />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            deleteProductCategory({ id: row.id });
                                        }}
                                        color="primary"
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
