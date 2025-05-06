import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { ChangeEvent, MouseEvent, useCallback, useMemo } from 'react';
import { productsRoute } from '~app/providers/router/config/routes';
import { useGetProductsQuery } from '~entities/product';
import { BulkUpdate, ProductsFilters, ProductsTable } from '~features/admin-products';
import { IProductsQueryArgs } from '~pages/admin-products/model/get-products/admin-products.types';
import { minimumPage } from '~shared/constants';
import { cleanedObject, stringifyObject } from '~shared/helpers';
import { Loader, PageHeader } from '~shared/ui/componets';
import { SearchInput } from '~shared/ui/componets/search-input';
import { FiltersPopover } from '~widgets/filters-popover';

export const GetProductsPage = () => {
    const searchParams = productsRoute.useSearch();
    const navigate = useNavigate({ from: productsRoute.fullPath });

    const { data, isLoading, isFetching } = useGetProductsQuery({
        ...stringifyObject(cleanedObject(searchParams)),
    });

    const onSearch = useCallback(
        (value: string) => {
            navigate({ search: (prev) => ({ ...prev, search: value, page: minimumPage }) });
        },
        [navigate],
    );

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

    const onFiltersSubmit = useCallback(
        (values: Pick<IProductsQueryArgs, 'categoryId' | 'sortBy' | 'order'>) => {
            navigate({ search: (prev) => ({ ...prev, ...values, page: minimumPage }) });
        },
        [navigate],
    );

    const onResetFilters = useCallback(() => {
        navigate({
            search: (prev) => {
                const { categoryId, order, sortBy, ...rest } = prev;
                return rest;
            },
        });
    }, [navigate]);

    const memoizedDefaultFilters: Omit<IProductsQueryArgs, 'itemsPerPage' | 'page' | 'search'> =
        useMemo(() => {
            const { itemsPerPage, page, search, ...rest } = cleanedObject(searchParams);
            return rest;
        }, [searchParams]);

    const memoizedDefaultSearchValue: string = useMemo(
        () => searchParams.search || '',
        [searchParams],
    );

    if (!data) {
        return <Loader />;
    }

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
                <PageHeader pageTitle="Products" />
                <Box display="flex" gap={2}>
                    <BulkUpdate />
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
            </Box>
            <Box display="flex" gap={2}>
                <SearchInput onSearch={onSearch} defaultValue={memoizedDefaultSearchValue} />
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
                page={searchParams.page ? searchParams.page - 1 : minimumPage - 1}
                onPageChange={onPageChange}
                isDisabled={isLoading || isFetching}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </Box>
    );
};
