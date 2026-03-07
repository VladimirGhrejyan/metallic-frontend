import { Box } from '@mui/material';
import { clientUpdateRoute } from '~app/providers/router/config/routes/client-update.route';
import { useGetClientByIdQuery } from '~entities/client';
import { UpdateClientForm } from '~features/admin-clients/ui/update-client/update-client.form';
import { BackButton, Loader } from '~shared/ui/components';

export const UpdateClientPage = () => {
    const { clientId } = clientUpdateRoute.useParams();
    const id = Number(clientId);
    const { data, isLoading } = useGetClientByIdQuery({ id });

    if (isLoading || !data) {
        return <Loader />;
    }

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <BackButton />
            <UpdateClientForm client={data!} />
        </Box>
    );
};
