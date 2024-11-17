import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    Box,
    Typography,
    Container,
} from '@mui/material';
import { io } from 'socket.io-client';

const HistoryRecognition = () => {
    const [records, setRecords] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const fetchRecords = async (page) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/recognitions?page=${page}&limit=10`,
            );
            const data = await response.json();
            console.log('Data:', data);
            setRecords(data.records);
            setTotalPages(data.total_page);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };
    useEffect(() => {
        fetchRecords(1);
        const socket = io(`${process.env.REACT_APP_SERVER_URL}`);
        socket.on('door_recognition', () => {
            fetchRecords(page);
        });
    }, []);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    const itemsPerPage = 3;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetchRecords(newPage);
    };

    return (
        <Container>
            <Box
                sx={{
                    my: 4,
                    '& .MuiTableCell-head': {
                        backgroundColor: 'primary.main',
                        color: 'common.white',
                        fontWeight: 'bold',
                    },
                    '& .MuiTableRow-root:nth-of-type(odd)': {
                        backgroundColor: 'action.hover',
                    },
                    '& .MuiTableRow-root:hover': {
                        backgroundColor: 'action.selected',
                    },
                    '& img': {
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 1,
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    },
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        mb: 3,
                        fontWeight: 'bold',
                        color: 'primary.main',
                    }}
                >
                    Face Recognition History
                </Typography>

                <TableContainer
                    component={Paper}
                    sx={{
                        borderRadius: 2,
                        boxShadow: 3,
                        overflow: 'hidden',
                    }}
                >
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>ID Door</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Recognition Image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.map((record, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ fontWeight: 500 }}>
                                        {record.user_id.slice(0, -1)}
                                    </TableCell>
                                    <TableCell>{record.door_id}</TableCell>
                                    <TableCell>{formatDate(record.timestamp)}</TableCell>
                                    <TableCell>
                                        <img
                                            src={
                                                `${process.env.REACT_APP_SERVER_URL}/` +
                                                record.image_url
                                            }
                                            alt="User"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 3,
                        '& .MuiPagination-ul': {
                            gap: 1,
                        },
                    }}
                >
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                        size="large"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                fontSize: '1rem',
                            },
                            '& .Mui-selected': {
                                backgroundColor: 'primary.main',
                                color: 'common.white',
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                },
                            },
                        }}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default HistoryRecognition;
