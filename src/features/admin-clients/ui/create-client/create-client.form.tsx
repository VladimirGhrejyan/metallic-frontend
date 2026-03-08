import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { FC } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~app/providers/store/config/store';
import { useCreateClientMutation } from '~entities/client';
import { showSnackbar } from '~entities/snackbar';
import { PageHeader } from '~shared/ui/components';
import { InputController } from '~shared/ui/controllers/input-controller';
import { InputNumberController } from '~shared/ui/controllers/input-controller/number-input.controller';

interface PhoneRow {
    phone: string;
    name: string;
}

interface IFormValues {
    name: string;
    address: string;
    taxpayerRegistrationNumber: string;
    priceAdjustment: number;
    phones: PhoneRow[];
}

export const CreateClientForm: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const form = useForm<IFormValues>({
        defaultValues: {
            name: '',
            address: '',
            taxpayerRegistrationNumber: '',
            priceAdjustment: 0,
            phones: [{ phone: '', name: '' }],
        },
    });
    const { fields, append, remove } = useFieldArray({ control: form.control, name: 'phones' });
    const [createClient, { isLoading }] = useCreateClientMutation();

    const onSubmit = (values: IFormValues) => {
        const phones = (values.phones ?? [])
            .filter((p) => (p.phone ?? '').trim() !== '')
            .map((p) => ({
                phone: (p.phone ?? '').trim(),
                name: (p.name ?? '').trim() || undefined,
            }));
        createClient({
            createClientDto: {
                name: values.name,
                address: values.address || undefined,
                taxpayerRegistrationNumber: values.taxpayerRegistrationNumber || undefined,
                priceAdjustment: values.priceAdjustment,
                ...(phones.length > 0 ? { phones } : {}),
            },
        })
            .unwrap()
            .then(() => {
                dispatch(showSnackbar({ message: 'Client created', severity: 'success' }));
                navigate({ to: '/admin/clients' });
            })
            .catch(() => {
                dispatch(showSnackbar({ message: 'Failed to create client', severity: 'error' }));
            });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, borderRadius: 2 }}>
            <PageHeader pageTitle="Create client" />
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
                        <Grid size={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography component="span" variant="subtitle2">
                                    Phones
                                </Typography>
                                <Button
                                    type="button"
                                    size="small"
                                    startIcon={<AddIcon />}
                                    onClick={() => append({ phone: '', name: '' })}
                                >
                                    Add phone
                                </Button>
                            </Box>
                            {fields.map((field, index) => (
                                <Box
                                    key={field.id}
                                    sx={{
                                        display: 'flex',
                                        gap: 1,
                                        alignItems: 'flex-start',
                                        mb: 1,
                                    }}
                                >
                                    <TextField
                                        {...form.register(`phones.${index}.phone`)}
                                        label="Phone"
                                        placeholder="0XXXXXXXXX"
                                        size="small"
                                        sx={{ flex: 1, minWidth: 140 }}
                                        error={!!form.formState.errors.phones?.[index]?.phone}
                                    />
                                    <TextField
                                        {...form.register(`phones.${index}.name`)}
                                        label="Name (optional)"
                                        size="small"
                                        sx={{ flex: 1, minWidth: 140 }}
                                    />
                                    <IconButton
                                        type="button"
                                        size="small"
                                        color="error"
                                        onClick={() => remove(index)}
                                        aria-label="Remove phone"
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            ))}
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 3 }}>
                        Create
                    </Button>
                </Box>
            </FormProvider>
        </Box>
    );
};
