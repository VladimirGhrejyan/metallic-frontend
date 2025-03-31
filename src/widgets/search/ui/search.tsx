import { TextField, debounce } from '@mui/material';
import { FC, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

export const Search: FC = () => {
    const { register, setValue } = useFormContext();

    const debouncedSetValue = useMemo(
        () =>
            debounce((value: string) => {
                setValue('searchQuery', value, { shouldValidate: true });
            }, 500),
        [setValue],
    );

    return (
        <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search"
            {...register('searchQuery')}
            onChange={(e) => debouncedSetValue(e.target.value)}
        />
    );
};
