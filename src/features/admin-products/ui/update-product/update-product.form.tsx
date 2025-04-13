import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, CardMedia, CircularProgress, Grid2, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateProductMutation } from '~entities/product';
import { useGetProductCategoriesQuery } from '~entities/product-category';
import {
    GetProductByIdApiResponse,
    useUpdateProductImageMutation,
} from '~entities/product/api/product';
import { cleanObjectByKeys, compressImage, convertHeicToJpeg } from '~shared/helpers';
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

export const UpdateProductForm: FC<IProps> = ({ data }) => {
    const [file, setFile] = useState<File | string>(data.image ? data.image.url : '');
    const [isImageUploading, setIsImageUploading] = useState<boolean>(false);

    const initialValues = {
        code: data.code,
        title: data.title,
        categoryId: data.categoryId,
        costPrice: data.costPrice,
        markup: data.markup,
        quantityAvailable: data.quantityAvailable,
        description: data.description ?? '',
    };

    const form = useForm<UpdateProductFormValues>({
        defaultValues: initialValues,
        resolver: zodResolver(updateProductFormSchema),
    });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: async (acceptedFiles) => {
            let completedFile: File | undefined = acceptedFiles[0];
            setIsImageUploading(true);
            if (completedFile.type.includes('heic')) {
                completedFile = await convertHeicToJpeg(completedFile);
            }
            completedFile = await compressImage(completedFile);
            setFile(completedFile || '');
            setIsImageUploading(false);
        },
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/heic': [],
        },
        multiple: false,
        disabled: isImageUploading,
    });

    const [updateProduct, { isLoading }] = useUpdateProductMutation();
    const [updateProductImage, { isLoading: isUploadImagetLoading }] =
        useUpdateProductImageMutation();
    const { data: productCategoriesList, isLoading: isGetLoading } = useGetProductCategoriesQuery({
        order: 'ASC',
        sortBy: 'code',
    });

    const onSubmit: SubmitHandler<UpdateProductFormValues> = (formValues) => {
        const cleanedValues = cleanObjectByKeys(formValues);

        updateProduct({ id: data.id, updateProductDto: cleanedValues })
            .unwrap()
            .then(() => {
                if (typeof file !== 'string' && file) {
                    const formData = new FormData();
                    formData.append('image', file as Blob, (file as File).name);
                    updateProductImage({
                        id: data.id,
                        body: formData as unknown as { image?: Blob },
                    });
                }
            });
    };

    return (
        <>
            {isLoading || isGetLoading || (isUploadImagetLoading && <Loader />)}
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
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        width: '100%',
                                        height: 250,
                                    }}
                                >
                                    <Box
                                        {...getRootProps()}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px dashed',
                                            borderColor: 'divider',
                                            background: 'white',
                                            borderRadius: 1,
                                            p: 2,
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            flex: 1,
                                            height: 250,
                                            transition: '0.3s',
                                            '&:hover': {
                                                backgroundColor: 'background.default',
                                                borderColor: 'primary.main',
                                            },
                                            opacity: isImageUploading ? 0.5 : 1,
                                        }}
                                    >
                                        <input {...getInputProps()} />
                                        {isImageUploading ? (
                                            <CircularProgress color="inherit" size={30} />
                                        ) : (
                                            <Typography variant="h6" fontWeight="normal">
                                                {isDragActive
                                                    ? 'Drop the file here...'
                                                    : 'Click or drag file to this area to upload'}
                                            </Typography>
                                        )}
                                    </Box>
                                    {file && (
                                        <Box
                                            sx={{
                                                flex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '100%',
                                                border: '2px',
                                                borderStyle: 'dashed',
                                                borderColor: 'divider',
                                                borderRadius: 1,
                                                padding: 1,
                                                transition: '0.3s',
                                                ':hover': {
                                                    borderColor: 'primary.main',
                                                    backgroundColor: 'background.default',
                                                    '& .image-delete-button': {
                                                        visibility: 'visible',
                                                    },
                                                },
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                src={
                                                    typeof file === 'string'
                                                        ? file
                                                        : URL.createObjectURL(file)
                                                }
                                                sx={{
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                    objectFit: 'scale-down',
                                                    borderRadius: 1,
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </Grid2>
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
                                <InputNumberController
                                    fullWidth
                                    name={'quantityAvailable'}
                                    label="Quantity Available"
                                    variant="outlined"
                                    decimalScale={0}
                                    allowNegative={false}
                                />
                            </Grid2>
                            <Grid2 size={12}>
                                <AutocompleteController
                                    loading={isGetLoading}
                                    options={
                                        productCategoriesList ? productCategoriesList.items : []
                                    }
                                    getOptionLabel={(option) => `${option.title} - ${option.code}`}
                                    name="categoryId"
                                    label="Category Id"
                                    placeholder="Category Id"
                                />
                            </Grid2>
                            <Grid2 size={12}>
                                <InputController
                                    fullWidth
                                    name={'description'}
                                    multiline
                                    rows={4}
                                    label="Description"
                                    variant="outlined"
                                />
                            </Grid2>
                        </Grid2>
                        <Button
                            disabled={
                                isLoading ||
                                isGetLoading ||
                                isImageUploading ||
                                isUploadImagetLoading
                            }
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
