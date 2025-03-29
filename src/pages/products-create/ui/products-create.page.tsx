import { Box } from '@mui/material';
import { PageHeader } from '~shared/ui/componets';
import { BackButton } from '~shared/ui/componets/back-button';

export const ProductIdCreatePage = () => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <BackButton />
            <PageHeader pageTitle={`Products Create`} />
        </Box>
    );
};
