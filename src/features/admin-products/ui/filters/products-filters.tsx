import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useGetProductCategoriesQuery } from '~entities/product-category';
import { TProductsFiltersFormValues } from '~features/admin-products/model/filters/form.types';
import { IProductsQueryArgs } from '~pages/admin-products/model/get-products/admin-products.types';
import { AutocompleteController } from '~shared/ui/controllers/input-controller/autocomplete-controller';

interface IProps {
    defaultValues: Omit<IProductsQueryArgs, 'itemsPerPage' | 'page' | 'search'>;
    onFiltersSubmit: (values: Pick<IProductsQueryArgs, 'categoryId' | 'sortBy' | 'order'>) => void;
    onResetFilters: () => void;
}

export const ProductsFilters: FC<IProps> = ({ onFiltersSubmit, onResetFilters, defaultValues }) => {
    const form = useForm<TProductsFiltersFormValues>({
        defaultValues: {
            categoryId: defaultValues.categoryId,
            order: defaultValues.order,
            sortBy: defaultValues.sortBy,
        },
    });

    const { data, isLoading } = useGetProductCategoriesQuery({ order: 'ASC', sortBy: 'code' });

    const onSubmit: SubmitHandler<TProductsFiltersFormValues> = (formValues) => {
        const { categoryId, order, sortBy } = formValues;

        const filteredValues: Pick<IProductsQueryArgs, 'categoryId' | 'sortBy' | 'order'> = {
            ...(categoryId !== undefined && { categoryId }),
            ...(order !== undefined && { order }),
            ...(sortBy !== undefined && { sortBy }),
        };

        onFiltersSubmit(filteredValues);
    };

    const onReset = () => {
        form.reset();
        onResetFilters();
    };

    return (
        <FormProvider {...form}>
            <Box
                component="form"
                sx={{ mt: 2, width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <AutocompleteController
                    loading={isLoading}
                    options={data ? data.items : []}
                    getOptionLabel={(option) => `${option.title} - ${option.code}`}
                    name="categoryId"
                    label="Category Id"
                    placeholder="Category Id"
                />
                <AutocompleteController
                    options={[
                        { title: 'ASC', id: 'ASC' },
                        { title: 'DESC', id: 'DESC' },
                    ]}
                    getOptionLabel={(option) => option.title}
                    name="order"
                    label="Order"
                    placeholder="Order"
                />
                <AutocompleteController
                    options={[
                        { title: 'Title', id: 'title' },
                        { title: 'Code', id: 'code' },
                        { title: 'Category Id', id: 'categoryId' },
                        { title: 'Cost Price', id: 'costPrice' },
                        { title: 'Created At', id: 'createdAt' },
                        { title: 'Updated At', id: 'updatedAt' },
                    ]}
                    getOptionLabel={(option) => option.title}
                    name="sortBy"
                    label="Sort By"
                    placeholder="Sort By"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button disabled={isLoading} variant="text" onClick={onReset}>
                        <Typography>Clear</Typography>
                    </Button>
                    <Button disabled={isLoading} type="submit" variant="contained">
                        <Typography>Submit</Typography>
                    </Button>
                </Box>
            </Box>
        </FormProvider>
    );
};
