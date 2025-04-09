import { Box, CardMedia, Grid2, TextField } from '@mui/material';
import { FC } from 'react';
import { GetProductByIdApiResponse } from '~entities/product';
import { PageHeader } from '~shared/ui/componets';

interface IProps {
    data: GetProductByIdApiResponse;
}

export const ViewProductForm: FC<IProps> = ({ data }) => {
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
            <PageHeader pageTitle={`View Product`} />
            <Box sx={{ mt: 2, width: '100%' }}>
                <Grid2 container spacing={2}>
                    {data.image && (
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
                                        src={data.image.url}
                                        sx={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'scale-down',
                                            borderRadius: 1,
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Grid2>
                    )}
                    <Grid2 size={12}>
                        <TextField fullWidth defaultValue={data.code} label="Code" disabled />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField fullWidth defaultValue={data.title} label="Title" disabled />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            fullWidth
                            defaultValue={data.costPrice}
                            label="Cost Price"
                            disabled
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField fullWidth defaultValue={data.markup} label="Markup" disabled />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            fullWidth
                            defaultValue={data.quantityAvailable}
                            label="Quantity Available"
                            disabled
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            fullWidth
                            defaultValue={data.categoryId}
                            label="Category Id"
                            disabled
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            fullWidth
                            defaultValue={data.description}
                            label="Description"
                            multiline
                            rows={4}
                            disabled
                        />
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    );
};
