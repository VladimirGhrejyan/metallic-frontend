import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid2 } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useCreateProductCategoryMutation } from '~entities/product-category';
import { PageHeader } from '~shared/ui/componets';
import { InputController } from '~shared/ui/controllers/input-controller';

import { createProductCategoryFormConstants } from '../model/form.constants';
import { createProductCategoryFormSchema } from '../model/form.schema';
import { CreateProductCategoryFormValues } from '../model/form.types';

const { CREATE } = createProductCategoryFormConstants.TEXTS;

export const ProductsCategoryCreateForm = () => {
    const form = useForm<CreateProductCategoryFormValues>({
        defaultValues: {
            code: '',
            title: '',
        },
        resolver: zodResolver(createProductCategoryFormSchema),
    });

    const [createProductCategory, { isLoading }] = useCreateProductCategoryMutation();

    const onSubmit: SubmitHandler<CreateProductCategoryFormValues> = (formValues) => {
        createProductCategory({ createProductCategoryDto: formValues })
            .unwrap()
            .then(() => form.reset());
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 3,
                borderRadius: 2,
                backgroundColor: 'background.paper',
            }}
        >
            <PageHeader pageTitle={`Products Category Create`} />
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
                                size="small"
                            />
                        </Grid2>

                        <Grid2 size={12}>
                            <InputController
                                fullWidth
                                name={'title'}
                                label="Title"
                                variant="outlined"
                                size="small"
                            />
                        </Grid2>
                    </Grid2>
                    <Button
                        disabled={isLoading}
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
    );
};
