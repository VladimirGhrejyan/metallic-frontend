import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { GetClientByIdApiResponse } from '~entities/client';
import { PageHeader } from '~shared/ui/components';

interface IProps {
    client: GetClientByIdApiResponse;
}

export const ViewClientForm: FC<IProps> = ({ client }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
            <PageHeader pageTitle="Client" />
            <Typography>
                <strong>Name:</strong> {client.name}
            </Typography>
            <Typography>
                <strong>Taxpayer registration number:</strong>{' '}
                {client.taxpayerRegistrationNumber ?? '—'}
            </Typography>
            <Typography>
                <strong>Address:</strong> {client.address ?? '—'}
            </Typography>
            <Typography>
                <strong>Price adjustment:</strong> {client.priceAdjustment}%
            </Typography>
            <Typography>
                <strong>Phones:</strong>
            </Typography>
            {client.phones?.length ? (
                <Box component="ul" sx={{ m: 0, pl: 3 }}>
                    {client.phones.map((p) => (
                        <li key={p.id}>
                            {p.phone} {p.name ? `(${p.name})` : ''}
                        </li>
                    ))}
                </Box>
            ) : (
                <Typography variant="body2" color="text.secondary">
                    No phones
                </Typography>
            )}
        </Box>
    );
};
