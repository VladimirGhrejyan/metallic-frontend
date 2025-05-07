import StorageIcon from '@mui/icons-material/Storage';
import { Box, TableCell, TableRow, Typography } from '@mui/material';

interface IProps {
    colSpan: number;
}

export const NoData = ({ colSpan }: IProps) => {
    return (
        <TableRow>
            <TableCell colSpan={colSpan}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        padding: 2,
                    }}
                >
                    <StorageIcon fontSize="large" />
                    <Typography
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: 'text.secondary',
                        }}
                    >
                        No data available
                    </Typography>
                </Box>
            </TableCell>
        </TableRow>
    );
};
