import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { FC } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';

import { IData, ITableHeader } from '../model/table.types';

// TODO get real data

const rows: IData[] = [
    {
        code: 'iS483DUYJTa_AYC',
        title: 'Product 1',
    },
    {
        code: '3P8DCNFv8L8VjUb',
        title: 'Product 2',
    },
    {
        code: 'QKXH9A1E8OQcAWd',
        title: 'Product 3',
    },
    {
        code: 'R6qnvEPv_h0dhfZ',
        title: 'Product 4',
    },
    {
        code: '2MYaS7ng0oIBMb1',
        title: 'Product 5',
    },
    {
        code: '3Ct__c6a0zWqqgX',
        title: 'Product 6',
    },
    {
        code: 'rWCavsEbHP28psp',
        title: 'Product 7',
    },
];

const tableHeaderRows: ITableHeader[] = [
    {
        id: 'code',
        title: 'Code',
    },
    {
        id: 'title',
        title: 'Title',
    },
    {
        id: 'action',
        title: 'Actions',
    },
];

export const ProductsCategoryTable: FC = () => {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: '540px', overflowX: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {tableHeaderRows.map((tableHeader) => (
                                <TableCell
                                    key={tableHeader.id}
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {tableHeader.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.code}>
                                <TableCell>{row.code}</TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" size="small">
                                        <MdEdit />
                                    </IconButton>
                                    <IconButton color="primary" size="small">
                                        <IoMdTrash />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
