import { Box } from '@mui/material';
import { clientViewRoute } from '~app/providers/router/config/routes/client-view.route';
import { useGetClientByIdQuery } from '~entities/client';
import { ViewClientForm } from '~features/admin-clients/ui/view-client/view-client.form';
import { BackButton, Loader } from '~shared/ui/components';

export const ViewClientPage = () => {
    const { clientId } = clientViewRoute.useParams();
    const id = Number(clientId);
    const { data, isLoading } = useGetClientByIdQuery({ id });

    if (isLoading || !data) {
        return <Loader />;
    }

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <BackButton />
            <ViewClientForm client={data!} />
        </Box>
    );
};
