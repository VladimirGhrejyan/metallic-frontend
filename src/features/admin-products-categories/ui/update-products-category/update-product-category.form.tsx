import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid2 } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
    GetProductCategoryByIdApiResponse,
    useUpdateProductCategoryMutation,
} from '~entities/product-category';
import { Loader, PageHeader } from '~shared/ui/componets';
import { InputController } from '~shared/ui/controllers/input-controller';

import { updateProductCategoryFormConstants } from '../../model/update-category/form.constants';
import { updateProductCategoryFormSchema } from '../../model/update-category/form.schema';
import { UpdateProductCategoryFormValues } from '../../model/update-category/form.types';

const { UPDATE } = updateProductCategoryFormConstants.TEXTS;

interface IProps {
    data: GetProductCategoryByIdApiResponse;
}

export const UpdateProductCategoryForm = ({ data }: IProps) => {
    const form = useForm<UpdateProductCategoryFormValues>({
        defaultValues: {
            code: data.code,
            title: data.title,
        },
        resolver: zodResolver(updateProductCategoryFormSchema),
    });

    const [updateCategory, { isLoading }] = useUpdateProductCategoryMutation();

    const onSubmit: SubmitHandler<UpdateProductCategoryFormValues> = (formValues) => {
        updateCategory({ id: data.id, updateProductCategoryDto: formValues });
    };

    return (
        <>
            {isLoading && <Loader />}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 3,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                }}
            >
                <PageHeader pageTitle="Create Products Category" />
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
                            {UPDATE}
                        </Button>
                    </Box>
                </FormProvider>
            </Box>
        </>
    );
};
