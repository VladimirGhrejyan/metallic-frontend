import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { TProductsCategoriesFiltersFormValues } from '~features/admin-products-categories/model/filters/form.types';
import { TProductsCategoriesQueryArgs } from '~pages/admin-products-categories/model/get-product-categories/form.types';
import { AutocompleteController } from '~shared/ui/controllers/input-controller/autocomplete-controller';

interface IProps {
    defaultValues: Omit<TProductsCategoriesQueryArgs, 'search'>;
    onFiltersSubmit: (values: Omit<TProductsCategoriesQueryArgs, 'search'>) => void;
    onResetFilters: () => void;
}

export const ProductsCategoriesFilters: FC<IProps> = ({
    onFiltersSubmit,
    onResetFilters,
    defaultValues,
}) => {
    const form = useForm<TProductsCategoriesFiltersFormValues>({
        defaultValues: {
            order: defaultValues.order,
            sortBy: defaultValues.sortBy,
        },
    });

    const onSubmit: SubmitHandler<TProductsCategoriesFiltersFormValues> = (formValues) => {
        const { order, sortBy } = formValues;

        const filteredValues = {
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
                        { title: 'Created At', id: 'createdAt' },
                        { title: 'Updated At', id: 'updatedAt' },
                    ]}
                    getOptionLabel={(option) => option.title}
                    name="sortBy"
                    label="Sort By"
                    placeholder="Sort By"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="text" onClick={onReset}>
                        Clear
                    </Button>
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </Box>
            </Box>
        </FormProvider>
    );
};
