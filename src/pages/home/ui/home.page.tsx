import { Box, TablePagination } from '@mui/material';
import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from 'react';
import { useGetProductsQuery } from '~entities/product';
import { ProductsFilters } from '~features/admin-products';
import { ProductsSection } from '~features/home';
import { TProductsQueryArgs } from '~pages/admin-products/model/get-products/admin-products.types';
import { Loader, PageHeader } from '~shared/ui/componets';
import { SearchInput } from '~shared/ui/componets/search-input';
import { FiltersPopover } from '~widgets/filters-popover';

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

export const HomePage = () => {
    const [queryArgs, setQueryArgs] = useState<TProductsQueryArgs>({
        page: '0',
        itemsPerPage: '10',
    });

    const { data } = useGetProductsQuery({
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
            setQueryArgs((prev) => ({ ...prev, ...values }));
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
                <SearchInput onSearch={onSearch} />
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
                count={data.meta.totalItems}
                page={Number(queryArgs.page) || 0}
                rowsPerPage={data.meta.itemsPerPage}
                onPageChange={onPageChange}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
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
