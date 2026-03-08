import { Box } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { ChangeEvent, MouseEvent, useCallback } from 'react';
import { ordersRoute } from '~app/providers/router/config/routes';
import { useGetOrdersQuery } from '~entities/order';
import { OrdersTable } from '~features/admin-orders';
import { minimumPage } from '~shared/constants';
import { cleanedObject, stringifyObject } from '~shared/helpers';
import { Loader, PageHeader } from '~shared/ui/components';

export const GetOrdersPage = () => {
    const searchParams = ordersRoute.useSearch();
    const navigate = useNavigate({ from: ordersRoute.fullPath });

    const { data, isLoading, isFetching } = useGetOrdersQuery({
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
            <PageHeader pageTitle="Orders" />
            <OrdersTable
                data={data}
                page={searchParams.page ? searchParams.page - 1 : minimumPage - 1}
                onPageChange={onPageChange}
                isDisabled={isLoading || isFetching}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </Box>
    );
};
