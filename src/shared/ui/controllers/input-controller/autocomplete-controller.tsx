import { Autocomplete, AutocompleteProps, CircularProgress, TextField } from '@mui/material';
import { Controller, ControllerProps, FieldValues, useFormContext } from 'react-hook-form';

type TProps<T extends { id: number | string }> = Omit<
    AutocompleteProps<T, false, false, false>,
    'name' | 'onChange' | 'value' | 'renderInput'
> &
    Pick<ControllerProps, 'name'> & {
        label?: string;
        placeholder?: string;
    };

export const AutocompleteController = <T extends { id: number | string }>({
    name,
    label,
    placeholder,
    ...autocompleteProps
}: TProps<T>) => {
    const { control } = useFormContext<FieldValues>();

    if (!control) {
        throw new Error('Form provider does not exist');
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Autocomplete
                    {...autocompleteProps}
                    value={
                        autocompleteProps.options.find((option) => option.id === field.value) ||
                        null
                    }
                    onChange={(_, value) => field.onChange(value?.id)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            placeholder={placeholder}
                            error={!!fieldState.error}
                            helperText={fieldState?.error?.message ?? ''}
                            disabled={autocompleteProps.loading}
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {autocompleteProps.loading ? (
                                                <CircularProgress color="inherit" size={20} />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                },
                            }}
                        />
                    )}
                />
            )}
        />
    );
};
