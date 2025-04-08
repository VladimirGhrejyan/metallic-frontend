import EditIcon from '@mui/icons-material/Edit';
import {
    IconButton,
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
import { FC } from 'react';
import { GetProductCategoriesApiResponse } from '~entities/product-category/api/product-category';
import { tableHeaderRows } from '~features/admin-products-categories/model/get-products/table.constants';
import { NoData } from '~shared/ui/componets';

interface IProps {
    data: GetProductCategoriesApiResponse;
    isDisabled: boolean;
}

export const ProductsCategoriesTable: FC<IProps> = ({ data, isDisabled }) => {
    const { items } = data;
    const navigate = useNavigate();

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
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            textAlign: tableHeader.align,
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
                                        >
                                            {row.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontWeight: 'bold' }}>
                                            {row.code}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                                        <IconButton
                                            disabled={isDisabled}
                                            onClick={() =>
                                                navigate({
                                                    to: `/admin/products-categories/${row.id}/edit`,
                                                })
                                            }
                                            color="primary"
                                            size="small"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <NoData colSpan={tableHeaderRows.length} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
