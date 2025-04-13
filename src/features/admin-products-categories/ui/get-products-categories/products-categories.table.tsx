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
    TableRow,
    Typography,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { FC, useCallback, useState } from 'react';
import {
    GetProductCategoriesApiResponse,
    useDeleteProductCategoryMutation,
} from '~entities/product-category/api/product-category';
import { tableHeaderRows } from '~features/admin-products-categories/model/get-products/table.constants';
import { NoData } from '~shared/ui/componets';
import { ConfirmationModal } from '~shared/ui/modals';

interface IProps {
    data: GetProductCategoriesApiResponse;
    isDisabled: boolean;
}

export const ProductsCategoriesTable: FC<IProps> = ({ data, isDisabled }) => {
    const { items } = data;
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
    const [deletionId, setDeletionId] = useState<number | null>(null);

    const [deleteCategory, { isLoading }] = useDeleteProductCategoryMutation();

    const deletionAction = useCallback(
        async (id: number) => {
            deleteCategory({ id })
                .unwrap()
                .then(() => {
                    setDeletionId(null);
                    setConfirmationModal(false);
                });
        },
        [deleteCategory],
    );

    const handleEditClick = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        navigate({
            to: `/admin/products-categories/${id}/edit`,
        });
    };

    const handleDeleteClick = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setConfirmationModal(true);
        setDeletionId(id);
    };

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
                                <TableRow
                                    key={row.id}
                                    onClick={() =>
                                        navigate({
                                            to: `/admin/products-categories/${row.id}/view`,
                                        })
                                    }
                                    sx={{
                                        transition: '0.3s',
                                        ':hover': {
                                            backgroundColor: 'background.default',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
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
                                            disabled={isDisabled || isLoading}
                                            onClick={(e) => handleEditClick(e, row.id)}
                                            color="primary"
                                            size="small"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            disabled={isDisabled || isLoading}
                                            onClick={(e) => handleDeleteClick(e, row.id)}
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
                </Table>
            </TableContainer>
            {confirmationModal && deletionId && (
                <ConfirmationModal
                    isDisabled={isLoading}
                    open={confirmationModal}
                    onClose={() => setConfirmationModal(false)}
                    actionName="Delete"
                    callbackFn={() => deletionAction(deletionId)}
                />
            )}
        </Paper>
    );
};
