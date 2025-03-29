import { Box } from '@mui/material';
import { useCallback, useState } from 'react';
import { ProductsSection } from '~features/home';
import { PageHeader } from '~shared/ui/componets';
import { Search } from '~widgets/search';

export const HomePage = () => {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearchChange = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <PageHeader pageTitle="Dashboard" />
            <Search searchValue={searchValue} onChange={handleSearchChange} />
            <ProductsSection />
        </Box>
    );
};
