import { TextField, TextFieldProps } from '@mui/material';
import { Controller, ControllerProps, FieldValues, useFormContext } from 'react-hook-form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

type TProps = Omit<TextFieldProps, 'name' | 'onChange' | 'value'> &
    Pick<ControllerProps, 'name'> &
    NumericFormatProps;

export const InputNumberController = ({ name, ...inputProps }: TProps) => {
    const { control } = useFormContext<FieldValues>();

    if (!control) {
        throw new Error('Form provider does not exist');
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <NumericFormat
                    {...inputProps}
                    {...field}
                    customInput={TextField}
                    error={!!fieldState.error}
                    helperText={fieldState?.error?.message ?? ''}
                    onValueChange={(values) => {
                        field.onChange(values.floatValue ?? 0);
                    }}
                />
            )}
        />
    );
};
