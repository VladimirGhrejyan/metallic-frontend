import { TextField, TextFieldProps, TextFieldVariants } from '@mui/material';
import { Controller, ControllerProps, FieldValues, useFormContext } from 'react-hook-form';

type TProps<T extends TextFieldVariants> = Omit<TextFieldProps<T>, 'name'> &
    Pick<ControllerProps, 'name'>;

export const InputController = <T extends TextFieldVariants = 'outlined'>({
    name,
    ...inputProps
}: TProps<T>) => {
    const { control } = useFormContext<FieldValues>();

    if (!control) {
        throw new Error('Form provider does not exist');
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                return (
                    <TextField
                        {...inputProps}
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState?.error?.message ?? ''}
                    />
                );
            }}
        />
    );
};
