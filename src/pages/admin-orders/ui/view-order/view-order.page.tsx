import { Box } from '@mui/material';
import { orderViewRoute } from '~app/providers/router/config/routes/order-view.route';
import { useGetOrderByIdQuery } from '~entities/order';
import { ViewOrderForm } from '~features/admin-orders/ui/view-order/view-order.form';
import { BackButton, Loader } from '~shared/ui/components';

export const ViewOrderPage = () => {
    const { orderId } = orderViewRoute.useParams();
    const id = Number(orderId);
    const { data, isLoading } = useGetOrderByIdQuery({ id });

    if (isLoading || !data) {
        return <Loader />;
    }

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <BackButton />
            <ViewOrderForm order={data} />
        </Box>
    );
};
