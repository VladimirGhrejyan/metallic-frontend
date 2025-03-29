import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { ProductsCategoryTable } from '~features/products-category';
import { PageHeader } from '~shared/ui/componets';
import { Search } from '~widgets/search';

export const AdminProductsCategoryPage = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState<string>('');
    const handleSearchChange = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
                <PageHeader pageTitle="Products Category" />
                <Button
                    onClick={() => navigate({ to: '/admin/products-category/create' })}
                    variant="outlined"
                    sx={{ gap: 1, color: 'primary.main', borderRadius: 1 }}
                >
                    <FiPlus size={20} />
                    <Typography variant="body1" fontWeight="bold">
                        New Category
                    </Typography>
                </Button>
            </Box>
            <Search searchValue={searchValue} onChange={handleSearchChange} />
            <ProductsCategoryTable />
        </Box>
    );
};
