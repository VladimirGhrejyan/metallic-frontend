import { TextField, debounce } from '@mui/material';
import { FC, useMemo } from 'react';

interface IProps {
    onSearch: (value: string) => void;
}

export const SearchInput: FC<IProps> = ({ onSearch }) => {
    const debouncedSetValue = useMemo(
        () =>
            debounce((value: string) => {
                onSearch(value);
            }, 500),
        [onSearch],
    );

    return (
        <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search"
            onChange={(e) => debouncedSetValue(e.target.value)}
        />
    );
};
