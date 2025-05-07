import { Box, TablePagination } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { ChangeEvent, MouseEvent, useCallback, useMemo } from 'react';
import { homeRoute } from '~app/providers/router/config/routes';
import { useGetProductsQuery } from '~entities/product';
import { ProductsFilters } from '~features/admin-products';
import { ProductsSection } from '~features/home';
import { IProductsQueryArgs } from '~pages/admin-products/model/get-products/admin-products.types';
import { defaultRowsPerPageOptions, minimumPage } from '~shared/constants';
import { cleanedObject, stringifyObject } from '~shared/helpers';
import { Loader, PageHeader } from '~shared/ui/components';
import { SearchInput } from '~shared/ui/components/search-input';
import { FiltersPopover } from '~widgets/filters-popover';

export const HomePage = () => {
    const searchParams = homeRoute.useSearch();
    const navigate = useNavigate({ from: homeRoute.fullPath });

    const { data } = useGetProductsQuery({
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
            search: (prev: IProductsQueryArgs) => {
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

    const rowsPerPageOptions = useMemo(() => {
        if (
            searchParams.itemsPerPage &&
            !defaultRowsPerPageOptions.includes(searchParams.itemsPerPage)
        ) {
            return [...defaultRowsPerPageOptions, searchParams.itemsPerPage].sort((a, b) => a - b);
        }
        return defaultRowsPerPageOptions;
    }, [searchParams]);

    if (!data) {
        return <Loader />;
    }

    return (
        <Box
            display="flex"
            height="100%"
            flexDirection="column"
            justifyContent="space-between"
            position="relative"
            gap={2}
        >
            <PageHeader pageTitle="Dashboard" />
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
            <ProductsSection data={data.items} />
            <TablePagination
                component="div"
                count={data.meta.totalItems}
                page={searchParams.page ? searchParams.page - 1 : minimumPage - 1}
                rowsPerPage={data.meta.itemsPerPage}
                onPageChange={onPageChange}
                rowsPerPageOptions={rowsPerPageOptions}
                onRowsPerPageChange={onRowsPerPageChange}
                sx={{
                    position: 'fixed',
                    right: '16px',
                    bottom: '16px',
                }}
            />
        </Box>
    );
};
