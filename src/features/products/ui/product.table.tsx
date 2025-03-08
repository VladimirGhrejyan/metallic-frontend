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
        costPrice: 100,
        markup: 200,
        categoryId: 1,
    },
    {
        code: '3P8DCNFv8L8VjUb',
        title: 'Product 2',
        costPrice: 100,
        markup: 200,
        categoryId: 2,
    },
    {
        code: 'QKXH9A1E8OQcAWd',
        title: 'Product 3',
        costPrice: 100,
        markup: 200,
        categoryId: 2,
    },
    {
        code: 'R6qnvEPv_h0dhfZ',
        title: 'Product 4',
        costPrice: 100,
        markup: 200,
        categoryId: 3,
    },
    {
        code: '2MYaS7ng0oIBMb1',
        title: 'Product 5',
        costPrice: 100,
        markup: 200,
        categoryId: 4,
    },
    {
        code: '3Ct__c6a0zWqqgX',
        title: 'Product 6',
        costPrice: 100,
        markup: 200,
        categoryId: 4,
    },
    {
        code: 'rWCavsEbHP28psp',
        title: 'Product 7',
        costPrice: 100,
        markup: 200,
        categoryId: 4,
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
        id: 'categoryId',
        title: 'Category ID',
    },
    {
        id: 'costPrice',
        title: 'Cost Price',
    },
    {
        id: 'markup',
        title: 'Markup',
    },
    {
        id: 'actions',
        title: 'Actions',
    },
];

export const ProductsTable: FC = () => {
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
                                <TableCell>{row.categoryId}</TableCell>
                                <TableCell>{row.costPrice}</TableCell>
                                <TableCell>{row.markup}</TableCell>
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
