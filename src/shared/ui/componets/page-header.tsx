import { Typography, useMediaQuery } from '@mui/material';

interface IProps {
    pageTitle: string;
}

export const PageHeader = ({ pageTitle }: IProps) => {
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
    return <Typography variant={isLargeScreen ? 'h2' : 'h5'}>{pageTitle}</Typography>;
};
