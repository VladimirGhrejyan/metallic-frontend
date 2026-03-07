import { Box, Button, Grid } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~app/providers/store/config/store';
import { GetClientByIdApiResponse, useUpdateClientMutation } from '~entities/client';
import { showSnackbar } from '~entities/snackbar';
import { PageHeader } from '~shared/ui/components';
import { InputController } from '~shared/ui/controllers/input-controller';
import { InputNumberController } from '~shared/ui/controllers/input-controller/number-input.controller';

interface IProps {
    client: GetClientByIdApiResponse;
}

interface IFormValues {
    name: string;
    address: string;
    taxpayerRegistrationNumber: string;
    priceAdjustment: number;
}

export const UpdateClientForm: FC<IProps> = ({ client }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const form = useForm<IFormValues>({
        defaultValues: {
            name: client.name,
            address: client.address ?? '',
            taxpayerRegistrationNumber: client.taxpayerRegistrationNumber ?? '',
            priceAdjustment: client.priceAdjustment,
        },
    });
    const [updateClient, { isLoading }] = useUpdateClientMutation();

    useEffect(() => {
        form.reset({
            name: client.name,
            address: client.address ?? '',
            taxpayerRegistrationNumber: client.taxpayerRegistrationNumber ?? '',
            priceAdjustment: client.priceAdjustment,
        });
    }, [client, form]);

    const onSubmit = (values: IFormValues) => {
        updateClient({
            id: client.id,
            updateClientDto: {
                name: values.name,
                address: values.address || undefined,
                taxpayerRegistrationNumber: values.taxpayerRegistrationNumber || undefined,
                priceAdjustment: values.priceAdjustment,
            },
        })
            .unwrap()
            .then(() => {
                dispatch(showSnackbar({ message: 'Client updated', severity: 'success' }));
                navigate({ to: '/admin/clients' });
            })
            .catch(() => {
                dispatch(showSnackbar({ message: 'Failed to update client', severity: 'error' }));
            });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, borderRadius: 2 }}>
            <PageHeader pageTitle="Edit client" />
            <FormProvider {...form}>
                <Box component="form" onSubmit={form.handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <InputController
                                fullWidth
                                name="name"
                                label="Name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid size={12}>
                            <InputController
                                fullWidth
                                name="taxpayerRegistrationNumber"
                                label="Taxpayer registration number"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid size={12}>
                            <InputController
                                fullWidth
                                name="address"
                                label="Address"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid size={12}>
                            <InputNumberController
                                fullWidth
                                name="priceAdjustment"
                                label="Price adjustment (%)"
                                variant="outlined"
                                decimalScale={2}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 3 }}>
                        Update
                    </Button>
                </Box>
            </FormProvider>
        </Box>
    );
};
