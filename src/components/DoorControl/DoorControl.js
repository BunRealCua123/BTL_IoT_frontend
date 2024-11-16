import React, { useState, useEffect, useCallback } from 'react';
import { Card, Box, Typography, Button, ButtonGroup, CircularProgress } from '@mui/material';
import { io } from 'socket.io-client';

const DoorControl = ({ device }) => {
    const [doorStatus, setDoorStatus] = useState(device?.status === 'OPEN');
    const [isLoading, setIsLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(device?.alive || false);
    const [socket, setSocket] = useState(null);
    const [isMoving, setIsMoving] = useState(false);
    const [isStopped, setIsStopped] = useState(false);
    const [movingDirection, setMovingDirection] = useState(null);

    // Initialize socket connection
    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        return () => {
            if (newSocket) newSocket.disconnect();
        };
    }, []);

    // Socket event listeners
    useEffect(() => {
        if (!socket) return;

        socket.on('door', (payload) => {
            const [deviceId, action] = payload.split(';');
            if (deviceId === device.deviceId) {
                switch (action) {
                    case 'LOGOPEN':
                        setDoorStatus('OPEN');
                        setIsMoving(false);
                        setMovingDirection(null);
                        break;
                    case 'LOGCLOSE':
                        setDoorStatus('CLOSE');
                        setIsMoving(false);
                        setMovingDirection(null);
                        break;
                    case 'LOGOPENING':
                        setIsMoving(true);
                        setIsStopped(false);
                        setMovingDirection('opening');
                        break;
                    case 'LOGCLOSING':
                        setIsMoving(true);
                        setIsStopped(false);
                        setMovingDirection('closing');
                        break;
                    case 'LOGSTOP':
                        setIsMoving(false);
                        setDoorStatus('STOPPED');
                        setMovingDirection('stopped');
                        setIsStopped(true);
                        break;
                    default:
                        break;
                }
            }
        });

        socket.on('dooralive', (status) => {
            setIsConnected(status === 'True');
        });

        return () => {
            socket.off('door');
            socket.off('dooralive');
        };
    }, [socket, device.deviceId]);

    // const checkDoorStatus = useCallback(async () => {
    //     if (!device?._id) return;

    //     try {
    //         const response = await fetch(`http://localhost:5000/api/door?door_id=${device._id}`);
    //         if (response.ok) {
    //             const data = await response.json();
    //             setDoorStatus(data.status);
    //         }
    //     } catch (error) {
    //         console.error('Error checking door status:', error);
    //     }
    // }, [device?._id]);

    // useEffect(() => {
    //     checkDoorStatus();
    // }, [checkDoorStatus]);

    const handleDoorControl = async (action) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/door', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    door_id: device.deviceId,
                    action: action,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Door control error:', errorData);
                // checkDoorStatus();
            }
        } catch (error) {
            console.error('Error controlling door:', error);
            // checkDoorStatus();
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
                    {device?.deviceId}
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
                            bgcolor: isConnected ? '#4CAF50' : '#ff0000',
                        }}
                    />
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: '0.875rem',
                            opacity: 0.8,
                        }}
                    >
                        {isConnected ? 'Connected' : 'Disconnected'}
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
                <Box sx={{ mb: 2 }}>
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
                                    color:
                                        doorStatus === 'OPEN'
                                            ? 'success.main'
                                            : doorStatus === 'CLOSE'
                                            ? 'text.secondary'
                                            : 'primary.main',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                }}
                            >
                                {doorStatus}
                            </Typography>
                            {isMoving && (
                                <Typography
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.75rem',
                                    }}
                                >
                                    Door is {movingDirection}...
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Box>

                <ButtonGroup variant="contained" fullWidth size="small" sx={{ gap: 1 }}>
                    <Button
                        onClick={() => handleDoorControl('OPEN')}
                        disabled={isLoading || !isConnected || isMoving || doorStatus === 'OPEN'}
                        sx={{
                            bgcolor: doorStatus === 'OPEN' ? 'success.main' : 'grey.300',
                            color: doorStatus === 'OPEN' ? 'white' : 'text.primary',
                            '&:hover': {
                                bgcolor: doorStatus === 'OPEN' ? 'success.dark' : 'grey.400',
                            },
                            '&.Mui-disabled': {
                                bgcolor: 'grey.300',
                                opacity: 0.5,
                            },
                        }}
                    >
                        {isLoading ? <CircularProgress size={20} /> : 'OPEN'}
                    </Button>
                    <Button
                        onClick={() => handleDoorControl('STOP')}
                        disabled={isLoading || !isConnected || !isMoving || isStopped}
                        color="warning"
                        sx={{
                            opacity: !isConnected || !isMoving ? 0.5 : 1,
                        }}
                    >
                        STOP
                    </Button>
                    <Button
                        onClick={() => handleDoorControl('CLOSE')}
                        disabled={isLoading || !isConnected || isMoving || doorStatus === 'CLOSE'}
                        sx={{
                            bgcolor: doorStatus === 'CLOSE' ? 'error.main' : 'grey.300',
                            color: doorStatus === 'CLOSE' ? 'white' : 'text.primary',
                            '&:hover': {
                                bgcolor: doorStatus === 'CLOSE' ? 'error.dark' : 'grey.400',
                            },
                            '&.Mui-disabled': {
                                bgcolor: 'grey.300',
                                opacity: 0.5,
                            },
                        }}
                    >
                        CLOSE
                    </Button>
                </ButtonGroup>
            </Card>
        </Card>
    );
};

export default DoorControl;
