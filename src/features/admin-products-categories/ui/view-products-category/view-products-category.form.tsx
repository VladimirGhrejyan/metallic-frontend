import { Box, Grid2, TextField } from '@mui/material';
import { FC } from 'react';
import { GetProductCategoryByIdApiResponse } from '~entities/product-category';
import { PageHeader } from '~shared/ui/componets';

interface IProps {
    data: GetProductCategoryByIdApiResponse;
}

export const ViewProductCategoryForm: FC<IProps> = ({ data }) => {
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
            <PageHeader pageTitle={`View Products Category`} />
            <Box sx={{ mt: 2, width: '100%' }}>
                <Grid2 container spacing={2}>
                    <Grid2 size={12}>
                        <TextField fullWidth defaultValue={data.code} label="Code" disabled />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField fullWidth defaultValue={data.title} label="Title" disabled />
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    );
};
