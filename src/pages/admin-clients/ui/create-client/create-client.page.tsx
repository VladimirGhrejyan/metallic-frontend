import { Box } from '@mui/material';
import { FC } from 'react';
import { CreateClientForm } from '~features/admin-clients/ui/create-client/create-client.form';
import { BackButton } from '~shared/ui/components';

export const CreateClientPage: FC = () => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <BackButton />
            <CreateClientForm />
        </Box>
    );
};
