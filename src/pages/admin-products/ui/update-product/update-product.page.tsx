import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import { productUpdateRoute } from '~app/providers/router/config/routes/product-update.route';
import { useDeleteProductMutation, useGetProductByIdQuery } from '~entities/product';
import { UpdateProductForm } from '~features/admin-products';
import { Loader } from '~shared/ui/componets';
import { BackButton } from '~shared/ui/componets/back-button';
import { ConfirmationModal } from '~shared/ui/modals';

export const UpdateProductPage = () => {
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
    const { productId } = productUpdateRoute.useParams();
    const { data } = useGetProductByIdQuery({ id: Number(productId) });

    const [deleteProduct, { isLoading }] = useDeleteProductMutation();

    const deletionAction = useCallback(
        async (id: number) => {
            deleteProduct({ id });
            navigate({ to: '/admin/products' });
            setConfirmationModal(false);
        },
        [deleteProduct, navigate],
    );

    if (!data) {
        return <Loader />;
    }

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" justifyContent="space-between">
                <BackButton />
                <Button
                    onClick={() => setConfirmationModal(true)}
                    variant="outlined"
                    color="error"
                    sx={{ gap: 1, borderRadius: 1 }}
                >
                    <DeleteIcon />
                    <Typography variant="body1" fontWeight="bold">
                        Delete
                    </Typography>
                </Button>
            </Box>
            <UpdateProductForm data={data} />
            {confirmationModal && productId && (
                <ConfirmationModal
                    isDisabled={isLoading}
                    open={confirmationModal}
                    onClose={() => setConfirmationModal(false)}
                    actionName="Delete"
                    callbackFn={() => deletionAction(Number(productId))}
                />
            )}
        </Box>
    );
};
