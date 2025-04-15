import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { FC, useCallback, useMemo } from 'react';
import { productsCategoriesRoute } from '~app/providers/router/config/routes';
import { useGetProductCategoriesQuery } from '~entities/product-category';
import {
    ProductsCategoriesFilters,
    ProductsCategoriesTable,
} from '~features/admin-products-categories';
import { cleanedObject, stringifyObject } from '~shared/helpers';
import { Loader, PageHeader } from '~shared/ui/componets';
import { SearchInput } from '~shared/ui/componets/search-input';
import { FiltersPopover } from '~widgets/filters-popover';

import { TProductsCategoriesQueryArgs } from '../../model/get-product-categories/form.types';

export const GetProductsCategoriesPage: FC = () => {
    const searchParams = productsCategoriesRoute.useSearch();
    const navigate = useNavigate({ from: productsCategoriesRoute.fullPath });

    const { data, isLoading, isFetching } = useGetProductCategoriesQuery({
        ...stringifyObject(cleanedObject(searchParams)),
    });

    const onSearch = useCallback(
        (value: string) => {
            navigate({ search: (prev) => ({ ...prev, search: value }) });
        },
        [navigate],
    );

    const onFiltersSubmit = useCallback(
        (values: Omit<TProductsCategoriesQueryArgs, 'search'>) => {
            navigate({ search: (prev) => ({ ...prev, ...values }) });
        },
        [navigate],
    );

    const onResetFilters = useCallback(() => {
        navigate({});
    }, [navigate]);

    const memoizedDefaultFilters: Omit<TProductsCategoriesQueryArgs, 'search'> = useMemo(() => {
        const { search, ...rest } = cleanedObject(searchParams);
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
            <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={2}
                alignItems="center"
            >
                <PageHeader pageTitle="Products Categories" />
                <Button
                    onClick={() => navigate({ to: '/admin/products-categories/create' })}
                    variant="outlined"
                    sx={{ gap: 1, color: 'primary.main', borderRadius: 1 }}
                >
                    <AddCircleOutlineIcon fontSize="medium" />
                    <Typography variant="body1" fontWeight="bold">
                        New Category
                    </Typography>
                </Button>
            </Box>
            <Box display="flex" gap={2}>
                <SearchInput onSearch={onSearch} defaultValue={memoizedDefaultSearchValue} />
                <FiltersPopover>
                    <ProductsCategoriesFilters
                        defaultValues={memoizedDefaultFilters}
                        onFiltersSubmit={onFiltersSubmit}
                        onResetFilters={onResetFilters}
                    />
                </FiltersPopover>
            </Box>
            <ProductsCategoriesTable data={data} isDisabled={isLoading || isFetching} />
        </Box>
    );
};
