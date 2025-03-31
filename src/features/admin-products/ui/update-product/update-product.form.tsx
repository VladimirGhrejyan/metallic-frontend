import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid2 } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateProductMutation } from '~entities/product';
import { useGetProductCategoriesQuery } from '~entities/product-category';
import { GetProductByIdApiResponse } from '~entities/product/api/product';
import { Loader, PageHeader } from '~shared/ui/componets';
import { InputController } from '~shared/ui/controllers/input-controller';
import { AutocompleteController } from '~shared/ui/controllers/input-controller/autocomplete-controller';
import { InputNumberController } from '~shared/ui/controllers/input-controller/number-input.controller';

import { updateProductConstants } from '../../model/update-product/form.constants';
import { updateProductFormSchema } from '../../model/update-product/form.schema';
import { UpdateProductFormValues } from '../../model/update-product/form.types';

const { UPDATE } = updateProductConstants.TEXTS;

interface IProps {
    data: GetProductByIdApiResponse;
}

export const UpdateProductForm = ({ data }: IProps) => {
    const form = useForm<UpdateProductFormValues>({
        defaultValues: {
            code: data.code,
            title: data.title,
            categoryId: data.categoryId,
            costPrice: data.costPrice,
            markup: data.markup,
        },
        resolver: zodResolver(updateProductFormSchema),
    });

    const [updateProduct, { isLoading }] = useUpdateProductMutation();
    const { data: productCategoriesList, isLoading: isGetLoading } = useGetProductCategoriesQuery(
        {},
    );

    const onSubmit: SubmitHandler<UpdateProductFormValues> = (formValues) => {
        updateProduct({ id: data.id, updateProductDto: formValues });
    };

    return (
        <>
            {isLoading || (isGetLoading && <Loader />)}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 3,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                }}
            >
                <PageHeader pageTitle={`Update Product`} />
                <FormProvider {...form}>
                    <Box
                        component="form"
                        sx={{ mt: 2, width: '100%' }}
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <Grid2 container spacing={2}>
                            <Grid2 size={12}>
                                <InputController
                                    fullWidth
                                    name={'code'}
                                    label="Code"
                                    variant="outlined"
                                />
                            </Grid2>

                            <Grid2 size={12}>
                                <InputController
                                    fullWidth
                                    name={'title'}
                                    label="Title"
                                    variant="outlined"
                                />
                            </Grid2>
                            <Grid2 size={12}>
                                <InputNumberController
                                    fullWidth
                                    name={'costPrice'}
                                    label="Cost Price"
                                    variant="outlined"
                                    decimalScale={2}
                                    allowNegative={false}
                                />
                            </Grid2>
                            <Grid2 size={12}>
                                <InputNumberController
                                    fullWidth
                                    name={'markup'}
                                    label="Markup"
                                    variant="outlined"
                                    decimalScale={2}
                                    allowNegative={false}
                                />
                            </Grid2>
                            <Grid2 size={12}>
                                <AutocompleteController
                                    loading={isGetLoading}
                                    options={
                                        productCategoriesList ? productCategoriesList.items : []
                                    }
                                    getOptionLabel={(option) => `${option.title}, ${option.code}`}
                                    name="categoryId"
                                    label="Category Id"
                                    placeholder="Category Id"
                                />
                            </Grid2>
                        </Grid2>
                        <Button
                            disabled={isLoading || isGetLoading}
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                            type={'submit'}
                        >
                            {UPDATE}
                        </Button>
                    </Box>
                </FormProvider>
            </Box>
        </>
    );
};
