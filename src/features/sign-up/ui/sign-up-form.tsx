import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, Grid2, Typography } from '@mui/material';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { InputController } from '~shared/ui/controllers/input-controller';
import { MuiCustomLink } from '~shared/ui/overrides/mui-link';

import { signUpFormConstants } from '../model/form.constants';
import { signUpSchema } from '../model/form.schema';
import { SignUpFormValues } from '../model/form.types';

const { SIGN_IN, SIGN_UP, REGISTERED } = signUpFormConstants.TEXTS;

export const SignUpForm: FC = () => {
    const form = useForm<SignUpFormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit: SubmitHandler<SignUpFormValues> = (formValues) => {
        // TODO remove log
        console.log(formValues);
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
                    {SIGN_UP}
                </Typography>

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
                                    name={'email'}
                                    label="Email"
                                    variant="outlined"
                                />
                            </Grid2>

                            <Grid2 size={12}>
                                <InputController
                                    fullWidth
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
                            {SIGN_UP}
                        </Button>
                    </Box>
                </FormProvider>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography component="p">{REGISTERED}</Typography>
                    <MuiCustomLink to="/sign-in" sx={{ textDecoration: 'none' }}>
                        {SIGN_IN}
                    </MuiCustomLink>
                </Box>
            </Box>
        </Container>
    );
};
