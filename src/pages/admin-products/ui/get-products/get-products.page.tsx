import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from 'react';
import { useGetProductsQuery } from '~entities/product';
import { ProductsFilters, ProductsTable } from '~features/admin-products';
import { Loader, PageHeader } from '~shared/ui/componets';
import { SearchInput } from '~shared/ui/componets/search-input';
import { FiltersPopover } from '~widgets/filters-popover';

import { TProductsQueryArgs } from '../../model/get-products/admin-products.types';

const filterQueryArgs = (
    queryArgs: TProductsQueryArgs,
    incrementPage: boolean = false,
): Omit<TProductsQueryArgs, ''> => {
    return {
        ...Object.fromEntries(
            Object.entries(queryArgs).filter(([_, value]) => value !== undefined && value !== ''),
        ),
        ...(incrementPage && queryArgs.page
            ? { page: (Number(queryArgs.page) + 1).toString() }
            : {}),
    };
};

export const GetProductsPage = () => {
    const navigate = useNavigate();
    const [queryArgs, setQueryArgs] = useState<TProductsQueryArgs>({
        page: '0',
        itemsPerPage: '10',
    });

    const { data, isLoading, isFetching } = useGetProductsQuery({
        ...filterQueryArgs(queryArgs, true),
    });

    const onSearch = useCallback(
        (value: string) => {
            setQueryArgs((prev) => ({ ...prev, search: value, page: '0' }));
        },
        [setQueryArgs],
    );

    const onPageChange = useCallback(
        (
            _: MouseEvent<HTMLElement> | MouseEvent<HTMLButtonElement, MouseEvent> | null,
            newPage: number,
        ) => {
            setQueryArgs((prev) => ({ ...prev, page: String(newPage) }));
        },
        [setQueryArgs],
    );

    const onRowsPerPageChange = useCallback(
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
            setQueryArgs((prev) => ({ ...prev, itemsPerPage: event?.target.value, page: '0' }));
        },
        [setQueryArgs],
    );

    const onFiltersSubmit = useCallback(
        (values: Pick<TProductsQueryArgs, 'categoryId' | 'sortBy' | 'order'>) => {
            setQueryArgs((prev) => ({ ...prev, ...values, page: '0' }));
        },
        [setQueryArgs],
    );

    const onResetFilters = useCallback(() => {
        setQueryArgs((prev) => {
            const { categoryId, order, sortBy, ...rest } = prev;
            return rest;
        });
    }, [setQueryArgs]);

    const memoizedDefaultFilters: Omit<TProductsQueryArgs, 'itemsPerPage' | 'page' | 'search'> =
        useMemo(() => {
            const { itemsPerPage, page, search, ...rest } = filterQueryArgs(queryArgs);
            return rest;
        }, [queryArgs]);

    if (!data) {
        return <Loader />;
    }

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
                <PageHeader pageTitle="Products" />
                <Button
                    onClick={() => navigate({ to: '/admin/products/create' })}
                    variant="outlined"
                    sx={{ gap: 1, color: 'primary.main', borderRadius: 1 }}
                >
                    <AddCircleOutlineIcon fontSize="medium" />
                    <Typography variant="body1" fontWeight="bold">
                        New Product
                    </Typography>
                </Button>
            </Box>
            <Box display="flex" gap={2}>
                <SearchInput onSearch={onSearch} />
                <FiltersPopover>
                    <ProductsFilters
                        defaultValues={memoizedDefaultFilters}
                        onFiltersSubmit={onFiltersSubmit}
                        onResetFilters={onResetFilters}
                    />
                </FiltersPopover>
            </Box>
            <ProductsTable
                data={data}
                page={Number(queryArgs.page) || 0}
                onPageChange={onPageChange}
                isDisabled={isLoading || isFetching}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </Box>
    );
};
