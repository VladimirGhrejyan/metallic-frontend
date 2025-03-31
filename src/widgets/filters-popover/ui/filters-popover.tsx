import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { FC, MouseEvent, ReactNode, useState } from 'react';
import { IoFilterSharp } from 'react-icons/io5';

interface IProps {
    children: ReactNode;
}

export const FiltersPopover: FC<IProps> = ({ children }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
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
                    {children}
                </Box>
            </Popover>
        </Box>
    );
};
