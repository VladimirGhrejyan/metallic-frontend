import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid2 } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { CreateProductDto, useCreateProductMutation } from '~entities/product';
import { useGetProductCategoriesQuery } from '~entities/product-category';
import { Loader, PageHeader } from '~shared/ui/componets';
import { InputController } from '~shared/ui/controllers/input-controller';
import { AutocompleteController } from '~shared/ui/controllers/input-controller/autocomplete-controller';
import { InputNumberController } from '~shared/ui/controllers/input-controller/number-input.controller';

import { createProductConstants } from '../../model/create-product/form.constants';
import { createProductFormSchema } from '../../model/create-product/form.schema';
import { CreateProductFormValues } from '../../model/create-product/form.types';

const { CREATE } = createProductConstants.TEXTS;

export const CreateProductForm = () => {
    const form = useForm<CreateProductFormValues>({
        defaultValues: {
            code: '',
            title: '',
            categoryId: null,
            costPrice: 0,
            markup: 0,
        },
        resolver: zodResolver(createProductFormSchema),
    });

    const [createProduct, { isLoading }] = useCreateProductMutation();
    const { data, isLoading: isGetLoading } = useGetProductCategoriesQuery({});

    const onSubmit: SubmitHandler<CreateProductFormValues> = (formValues) => {
        createProduct({ createProductDto: formValues as CreateProductDto })
            .unwrap()
            .then(() => form.reset());
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
                <PageHeader pageTitle={`Create Product`} />
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
                                    options={data ? data.items : []}
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
                            {CREATE}
                        </Button>
                    </Box>
                </FormProvider>
            </Box>
        </>
    );
};
