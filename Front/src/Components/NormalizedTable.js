import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor: theme.palette.action.hover,
}));

const NormalizedTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }

    const columns = Object.keys(data[0]);
    const reorderedColumns = ['id', ...columns.filter(col => col !== 'id').reverse()];

    return (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {reorderedColumns.map((column, index) => (
                            <CustomTableCell key={index}>
                                {column}
                            </CustomTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index} hover>
                            {reorderedColumns.map((column, colIndex) => (
                                <TableCell key={colIndex}>{row[column]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default NormalizedTable;
