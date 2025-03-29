import { Autocomplete, Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { IoFilterSharp } from 'react-icons/io5';

export const FiltersPopover = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box>
            <Button
                aria-describedby={'aaaa'}
                variant="contained"
                sx={{
                    gap: 1,
                    borderRadius: 1,
                    width: '100%',
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'flex-start',
                }}
                onClick={handleClick}
            >
                <IoFilterSharp size={20} />
                <Typography variant="body1" fontWeight="bold">
                    Filters
                </Typography>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                sx={{
                    mt: 1,
                }}
            >
                <Box
                    sx={{
                        padding: 3,
                        width: '350px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Autocomplete
                        multiple
                        disableCloseOnSelect
                        limitTags={2}
                        fullWidth
                        options={[
                            { title: 'The Shawshank Redemption', year: 1994 },
                            { title: 'The Godfather', year: 1972 },
                            { title: 'The Godfather: Part II', year: 1974 },
                            { title: 'The Dark Knight', year: 2008 },
                            { title: '12 Angry Men', year: 1957 },
                            { title: "Schindler's List", year: 1993 },
                            { title: 'Pulp Fiction', year: 1994 },
                        ]}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Product Categories"
                                placeholder="Select Category"
                                size="small"
                            />
                        )}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="text">Clear</Button>
                        <Button variant="contained">Submit</Button>
                    </Box>
                </Box>
            </Popover>
        </Box>
    );
};

/*

<Autocomplete
    multiple
    disableCloseOnSelect
    options={[
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
    ]}
    getOptionLabel={(option) => option.title}
    renderInput={(params) => (
        <TextField
            {...params}
            variant="filled"
            label="freeSolo"
            placeholder="Favorites"
        />
    )}
    sx={{ width: 300 }}
/>

*/
