import { zodResolver } from '@hookform/resolvers/zod';
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    CardMedia,
    CircularProgress,
    Grid2,
    IconButton,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
    CreateProductDto,
    useCreateProductMutation,
    useUpdateProductImageMutation,
} from '~entities/product';
import { useGetProductCategoriesQuery } from '~entities/product-category';
import { cleanObjectByKeys, compressImage, convertHeicToJpeg } from '~shared/helpers';
import { Loader, PageHeader } from '~shared/ui/componets';
import { InputController } from '~shared/ui/controllers/input-controller';
import { AutocompleteController } from '~shared/ui/controllers/input-controller/autocomplete-controller';
import { InputNumberController } from '~shared/ui/controllers/input-controller/number-input.controller';

import { createProductConstants } from '../../model/create-product/form.constants';
import { createProductFormSchema } from '../../model/create-product/form.schema';
import { CreateProductFormValues } from '../../model/create-product/form.types';

const { CREATE } = createProductConstants.TEXTS;

export const CreateProductForm = () => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
    const form = useForm<CreateProductFormValues>({
        defaultValues: {
            code: '',
            title: '',
            categoryId: null,
            costPrice: 0,
            markup: 0,
            quantityAvailable: 0,
            description: '',
        },
        resolver: zodResolver(createProductFormSchema),
    });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: async (acceptedFiles) => {
            let completedFile: File | undefined = acceptedFiles[0];
            setIsImageUploading(true);
            if (completedFile.type.includes('heic')) {
                completedFile = await convertHeicToJpeg(completedFile);
            }
            completedFile = await compressImage(completedFile);
            setFile(completedFile);
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

    const [createProduct, { isLoading }] = useCreateProductMutation();
    const [updateProductImage, { isLoading: isUploadImagetLoading }] =
        useUpdateProductImageMutation();
    const { data, isLoading: isGetLoading } = useGetProductCategoriesQuery({});

    const onSubmit: SubmitHandler<CreateProductFormValues> = (formValues) => {
        const cleanedValues = cleanObjectByKeys(formValues, ['description']);

        createProduct({ createProductDto: cleanedValues as CreateProductDto })
            .unwrap()
            .then((res) => {
                if (file) {
                    const formData = new FormData();
                    formData.append('image', file as Blob, (file as File).name);
                    updateProductImage({
                        id: res.id,
                        body: formData as unknown as { image?: Blob },
                    })
                        .unwrap()
                        .then(() => {
                            form.reset();
                            setFile(undefined);
                        });
                } else {
                    form.reset();
                    setFile(undefined);
                }
            });
    };

    const deleteUploadedFile = () => {
        setFile(undefined);
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
                <PageHeader pageTitle={`Create Product`} />
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
                                                position: 'relative',
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
                                                src={URL.createObjectURL(file)}
                                                sx={{
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                    objectFit: 'scale-down',
                                                    borderRadius: 1,
                                                }}
                                            />
                                            <IconButton
                                                className="image-delete-button"
                                                size="small"
                                                sx={{
                                                    position: 'absolute',
                                                    right: '5px',
                                                    top: '5px',
                                                    zIndex: 10,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                    color: '#fff',
                                                    boxShadow: '0 0 4px rgba(0,0,0,0.5)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                    },
                                                    visibility: 'hidden',
                                                }}
                                                onClick={deleteUploadedFile}
                                            >
                                                <CloseIcon />
                                            </IconButton>
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
                                    options={data ? data.items : []}
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
                            {CREATE}
                        </Button>
                    </Box>
                </FormProvider>
            </Box>
        </>
    );
};
