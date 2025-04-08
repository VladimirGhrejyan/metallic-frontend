import { zodResolver } from '@hookform/resolvers/zod';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, Container, Grid2, IconButton, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSignUpMutation } from '~entities/auth';
import { InputController } from '~shared/ui/controllers/input-controller';
import { MuiCustomLink } from '~shared/ui/overrides/mui-link';

import { signUpFormConstants } from '../model/form.constants';
import { signUpSchema } from '../model/form.schema';
import { SignUpFormValues } from '../model/form.types';

const { SIGN_IN, SIGN_UP, REGISTERED } = signUpFormConstants.TEXTS;

export const SignUpForm: FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const form = useForm<SignUpFormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(signUpSchema),
    });

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const [signUp] = useSignUpMutation();

    const onSubmit: SubmitHandler<SignUpFormValues> = async (formValues) => {
        signUp({
            signUpInputDto: {
                email: formValues.email.toLowerCase(),
                password: formValues.password,
            },
        });
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
                                    type={showPassword ? 'text' : 'password'}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <IconButton onClick={toggleShowPassword}>
                                                    {showPassword ? (
                                                        <VisibilityOffIcon fontSize="medium" />
                                                    ) : (
                                                        <VisibilityIcon fontSize="medium" />
                                                    )}
                                                </IconButton>
                                            ),
                                        },
                                    }}
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
