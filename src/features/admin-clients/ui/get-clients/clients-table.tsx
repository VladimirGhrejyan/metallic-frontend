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
import { ChangeEvent, FC, MouseEvent, useCallback, useState } from 'react';
import { GetClientsApiResponse, useDeleteClientMutation } from '~entities/client';
import { defaultRowsPerPageOptions } from '~shared/constants';
import { NoData } from '~shared/ui/components';
import { ConfirmationModal } from '~shared/ui/modals';

interface IProps {
    data: GetClientsApiResponse;
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

export const ClientsTable: FC<IProps> = ({
    data,
    isDisabled,
    onPageChange,
    page,
    onRowsPerPageChange,
}) => {
    const { items, meta } = data;
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
    const [deletionId, setDeletionId] = useState<number | null>(null);

    const [deleteClient, { isLoading }] = useDeleteClientMutation();

    const deletionAction = useCallback(
        async (id: number) => {
            deleteClient({ id })
                .unwrap()
                .then(() => {
                    setDeletionId(null);
                    setConfirmationModal(false);
                });
        },
        [deleteClient],
    );

    const handleEditClick = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        navigate({ to: `/admin/clients/${id}/edit` });
    };

    const handleDeleteClick = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setConfirmationModal(true);
        setDeletionId(id);
    };

    return (
        <Paper
            sx={{ width: '100%', overflow: 'hidden', opacity: isDisabled || isLoading ? 0.7 : 1 }}
        >
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: 'primary.main' }}>
                                <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: 'primary.main' }}>
                                <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                    TRN
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: 'primary.main' }}>
                                <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                    Address
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: 'primary.main' }}>
                                <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                    Phones
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
                                    onClick={() =>
                                        navigate({ to: `/admin/clients/${row.id}/view` })
                                    }
                                    sx={{
                                        transition: '0.3s',
                                        ':hover': {
                                            backgroundColor: 'background.default',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.taxpayerRegistrationNumber ?? '—'}</TableCell>
                                    <TableCell>{row.address ?? '—'}</TableCell>
                                    <TableCell>{row.phones?.length ?? 0}</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
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
                            <NoData colSpan={5} />
                        )}
                    </TableBody>
                    <TablePagination
                        disabled={isDisabled || isLoading || !items.length}
                        count={meta.totalItems}
                        page={page}
                        rowsPerPage={meta.itemsPerPage}
                        onPageChange={onPageChange}
                        rowsPerPageOptions={defaultRowsPerPageOptions}
                        onRowsPerPageChange={onRowsPerPageChange}
                    />
                </Table>
            </TableContainer>
            {confirmationModal && deletionId && (
                <ConfirmationModal
                    isDisabled={isLoading}
                    open={confirmationModal}
                    onClose={() => setConfirmationModal(false)}
                    actionName="Delete"
                    actionColor="error"
                    callbackFn={() => deletionAction(deletionId)}
                />
            )}
        </Paper>
    );
};
