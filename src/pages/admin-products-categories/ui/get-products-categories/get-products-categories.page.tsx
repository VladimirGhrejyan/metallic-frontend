import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { FC, useCallback, useMemo, useState } from 'react';
import { useGetProductCategoriesQuery } from '~entities/product-category';
import {
    ProductsCategoriesFilters,
    ProductsCategoriesTable,
} from '~features/admin-products-categories';
import { filterQueryArgs } from '~shared/helpers';
import { Loader, PageHeader } from '~shared/ui/componets';
import { SearchInput } from '~shared/ui/componets/search-input';
import { FiltersPopover } from '~widgets/filters-popover';

import { TProductsCategoriesQueryArgs } from '../../model/get-product-categories/form.types';

export const GetProductsCategoriesPage: FC = () => {
    const navigate = useNavigate();
    const [queryArgs, setQueryArgs] = useState<TProductsCategoriesQueryArgs>({});

    const { data, isLoading, isFetching } = useGetProductCategoriesQuery({
        ...filterQueryArgs(queryArgs),
    });

    const onSearch = useCallback(
        (value: string) => {
            setQueryArgs({ search: value });
        },
        [setQueryArgs],
    );

    const onFiltersSubmit = useCallback(
        (values: Omit<TProductsCategoriesQueryArgs, 'search'>) => {
            setQueryArgs((prev) => ({ ...prev, ...values }));
        },
        [setQueryArgs],
    );

    const onResetFilters = useCallback(() => {
        setQueryArgs({});
    }, [setQueryArgs]);

    const memoizedDefaultFilters: Omit<TProductsCategoriesQueryArgs, 'search'> = useMemo(() => {
        const { search, ...rest } = filterQueryArgs(queryArgs);
        return rest;
    }, [queryArgs]);

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
                <SearchInput onSearch={onSearch} />
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
