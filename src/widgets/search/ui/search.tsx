import { Box, TextField } from '@mui/material';
import { FC } from 'react';
import { FiltersPopover } from '~widgets/filters-popover';

interface IProps {
    searchValue: string;
    onChange: (value: string) => void;
}

export const Search: FC<IProps> = ({ searchValue, onChange }) => {
    return (
        <Box display="flex" gap={2}>
            <TextField
                label="Search"
                variant="outlined"
                value={searchValue}
                onChange={(e) => onChange(e.target.value)}
                fullWidth
                size="small"
                autoComplete="off"
            />
            <FiltersPopover />
        </Box>
    );
};
