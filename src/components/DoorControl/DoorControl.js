// DoorControl.js
import React, { useState } from 'react';
import { Card, Switch, Box, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const DoorControl = ({ doorName = 'Door 1' }) => {
    const [doorStatus, setDoorStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDoorControl = async () => {
        setIsLoading(true);
        try {
            const action = !doorStatus ? 'OPEN' : 'CLOSE';
            const response = await fetch('http://localhost:5000/api/door', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: action,
                    door_name: doorName,
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

    const handleCameraControl = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/camera_door', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    door_name: doorName,
                }),
            });

            if (response.ok) {
                setDoorStatus(true);
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
                    {doorName}
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
                            bgcolor: '#4CAF50',
                        }}
                    />
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: '0.875rem',
                            opacity: 0.8,
                        }}
                    >
                        Connected
                    </Typography>
                </Box>
            </Box>

            <Card
                sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '12px',
                    p: 1.5,
                    mb: 1,
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
                        disabled={isLoading}
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

            <Card
                onClick={handleCameraControl}
                sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '12px',
                    p: 1.5,
                    cursor: 'pointer',
                    '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.95)',
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '12px',
                            bgcolor: '#4A90E2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CameraAltIcon sx={{ color: 'white' }} />
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                color: '#666',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                            }}
                        >
                            Camera Access
                        </Typography>
                        <Typography
                            sx={{
                                color: '#666',
                                fontSize: '0.75rem',
                            }}
                        >
                            Click to unlock with camera
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Card>
    );
};

export default DoorControl;
