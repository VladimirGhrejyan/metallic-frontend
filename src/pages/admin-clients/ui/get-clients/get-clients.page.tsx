import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { ChangeEvent, MouseEvent, useCallback } from 'react';
import { clientsRoute } from '~app/providers/router/config/routes';
import { useGetClientsQuery } from '~entities/client';
import { ClientsTable } from '~features/admin-clients';
import { minimumPage } from '~shared/constants';
import { cleanedObject, stringifyObject } from '~shared/helpers';
import { Loader, PageHeader } from '~shared/ui/components';

export const GetClientsPage = () => {
    const searchParams = clientsRoute.useSearch();
    const navigate = useNavigate({ from: clientsRoute.fullPath });

    const { data, isLoading, isFetching } = useGetClientsQuery({
        ...stringifyObject(cleanedObject(searchParams)),
    });

    const onPageChange = useCallback(
        (
            _: MouseEvent<HTMLElement> | MouseEvent<HTMLButtonElement, MouseEvent> | null,
            newPage: number,
        ) => {
            navigate({ search: (prev) => ({ ...prev, page: newPage + 1 }) });
        },
        [navigate],
    );

    const onRowsPerPageChange = useCallback(
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
            navigate({
                search: (prev) => ({
                    ...prev,
                    itemsPerPage: Number(event?.target.value),
                    page: minimumPage,
                }),
            });
        },
        [navigate],
    );

    if (!data) {
        return <Loader />;
    }

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
                <PageHeader pageTitle="Clients" />
                <Button
                    onClick={() => navigate({ to: '/admin/clients/create' })}
                    variant="outlined"
                    sx={{ gap: 1, color: 'primary.main', borderRadius: 1 }}
                >
                    <AddCircleOutlineIcon fontSize="medium" />
                    <Typography variant="body1" fontWeight="bold">
                        New Client
                    </Typography>
                </Button>
            </Box>
            <ClientsTable
                data={data}
                page={searchParams.page ? searchParams.page - 1 : minimumPage - 1}
                onPageChange={onPageChange}
                isDisabled={isLoading || isFetching}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </Box>
    );
};
