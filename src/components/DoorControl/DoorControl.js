import React, { useState, useEffect } from 'react';
import { Card, Switch, Box, Typography } from '@mui/material';

const DoorControl = ({ device }) => {
    const [doorStatus, setDoorStatus] = useState(device?.status === 'ON');
    const [isLoading, setIsLoading] = useState(false);

    // Cập nhật doorStatus khi device prop thay đổi
    useEffect(() => {
        if (device) {
            setDoorStatus(device.status === 'ON');
        }
    }, [device]);

    const handleDoorControl = async () => {
        setIsLoading(true);
        try {
            const action = !doorStatus ? 'ON' : 'OFF';
            const response = await fetch('http://localhost:5000/api/device', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    device_id: device._id,
                    status: action,
                }),
            });

            if (response.ok) {
                setDoorStatus(!doorStatus);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card
            sx={{
                width: 280,
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                p: 2,
                boxShadow: 'none',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: 'white',
                        fontSize: '1.25rem',
                        fontWeight: 500,
                    }}
                >
                    {device?.name}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: device?.connected ? '#4CAF50' : '#ff0000',
                        }}
                    />
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: '0.875rem',
                            opacity: 0.8,
                        }}
                    >
                        {device?.connected ? 'Connected' : 'Disconnected'}
                    </Typography>
                </Box>
            </Box>

            <Card
                sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '12px',
                    p: 1.5,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '12px',
                                bgcolor: '#FF6B6B',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box
                                component="span"
                                sx={{
                                    width: 24,
                                    height: 24,
                                    bgcolor: 'white',
                                    maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4'%3E%3C/path%3E%3C/svg%3E")`,
                                    maskRepeat: 'no-repeat',
                                    maskPosition: 'center',
                                    WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4'%3E%3C/path%3E%3C/svg%3E")`,
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center',
                                }}
                            />
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    color: doorStatus ? '#4CAF50' : '#666',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                }}
                            >
                                {doorStatus ? 'ON' : 'OFF'}
                            </Typography>
                            <Typography sx={{ color: '#666' }}>Door Lock</Typography>
                        </Box>
                    </Box>
                    <Switch
                        checked={doorStatus}
                        onChange={handleDoorControl}
                        disabled={isLoading || !device?.connected}
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#FF6B6B',
                                '&:hover': {
                                    bgcolor: 'rgba(255, 107, 107, 0.08)',
                                },
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                bgcolor: '#FF6B6B',
                            },
                        }}
                    />
                </Box>
            </Card>
        </Card>
    );
};

export default DoorControl;
