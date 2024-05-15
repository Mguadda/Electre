import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTableCellHeader = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
}));

const CustomTableCellBody = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const ScoreTable = ({ data, title }) => {
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }

    const columns = data[0] ? Object.keys(data[0]) : [];

    return (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <CustomTableCellHeader key={index}>
                                {column.toUpperCase()}
                            </CustomTableCellHeader>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index} hover>
                            {columns.map((column, colIndex) => (
                                <CustomTableCellBody key={colIndex}>{row[column]}</CustomTableCellBody>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {title && (
                <Typography variant="h6" component="div" sx={{ p: 2, textAlign: 'center' }}>
                    {title}
                </Typography>
            )}
        </TableContainer>
    );
};

export default ScoreTable;
