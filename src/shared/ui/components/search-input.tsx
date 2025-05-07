import { TextField, debounce } from '@mui/material';
import { FC, useMemo } from 'react';

interface IProps {
    onSearch: (value: string) => void;
    defaultValue: string;
}

export const SearchInput: FC<IProps> = ({ onSearch, defaultValue = '' }) => {
    const debouncedSetValue = useMemo(
        () =>
            debounce((value: string) => {
                onSearch(value);
            }, 500),
        [onSearch],
    );

    return (
        <TextField
            defaultValue={defaultValue}
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search"
            onChange={(e) => debouncedSetValue(e.target.value)}
        />
    );
};
