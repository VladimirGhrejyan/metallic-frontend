import { Box, Button, Container, Grid2, Typography } from '@mui/material';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { InputController } from '~shared/ui/controllers/input-controller';

import { SignUpFormValues } from '../model/form.types';

export const SignUpForm: FC = () => {
    const form = useForm<SignUpFormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<SignUpFormValues> = (_) => {
        // initiate request
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                }}
            >
                <Typography variant="h5" component="h1" gutterBottom>
                    Sign Up
                </Typography>

                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Box component="form" sx={{ mt: 2, width: '100%' }}>
                            <Grid2 container spacing={2}>
                                <Grid2 size={{ xs: 12, sm: 6 }}>
                                    <InputController
                                        fullWidth
                                        required
                                        name={'username'}
                                        label="Username"
                                        variant="outlined"
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 6 }}>
                                    <InputController
                                        fullWidth
                                        required
                                        label="Password"
                                        variant="outlined"
                                        name={'password'}
                                        type="password"
                                    />
                                </Grid2>
                            </Grid2>

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                                type={'submit'}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </form>
                </FormProvider>
            </Box>
        </Container>
    );
};
