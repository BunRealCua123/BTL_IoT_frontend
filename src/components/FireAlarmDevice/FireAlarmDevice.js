// App.js
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Switch, Container, Paper } from '@mui/material';
import { LightbulbCircle, WaterDrop } from '@mui/icons-material';

const FireAlarmDevice = ({ device }) => {
    console.log('FireAlarm');
    const [isOn, setIsOn] = useState(true);
    const { deviceId, status, alive } = device;
    useEffect(() => {
        if (status === 'ON') {
            setIsOn(true);
        } else {
            setIsOn(false);
        }
    }, []);

    const handleToggle = async (event) => {
        setIsOn(event.target.checked);
        let action = event.target.checked ? 'ON' : 'OFF';
        console.log(action);
        const data = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/firealarm/pump`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: action,
                idDevice: deviceId,
                type: 'pump',
            }),
        });
        console.log('hello', data.status);
    };

    return (
        <Card
            sx={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                width: '280px',
                height: '200px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: 'white',
                        paddingBottom: '15px',
                        borderBottom: '1px solid #eee',
                        marginBottom: '20px',
                    }}
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <div>{deviceId}</div>
                    {alive ? (
                        <div
                            class="status-badge"
                            style={{ color: 'white', fontSize: '0.875rem', fontWeight: 'normal' }}
                        >
                            <div class="status-dot connected"></div>
                            Connected
                        </div>
                    ) : (
                        <div
                            class="status-badge"
                            style={{ color: 'white', fontSize: '0.875rem', fontWeight: 'normal' }}
                        >
                            <div class="status-dot disconnected"></div>
                            Disconnected
                        </div>
                    )}
                </Typography>

                <Paper
                    elevation={0}
                    sx={{
                        background: '#f8f9ff',
                        padding: '20px',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                        }}
                    >
                        <Box
                            sx={{
                                background: '#8b7ff9',
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '20px',
                            }}
                        >
                            <WaterDrop />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '13px',
                                    color: '#8b7ff9',
                                    fontWeight: 600,
                                }}
                            >
                                {isOn ? 'ON' : 'OFF'}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '15px',
                                    color: '#333',
                                    fontWeight: 500,
                                }}
                            >
                                Watter Pump
                            </Typography>
                        </Box>
                    </Box>
                    <Switch
                        checked={isOn}
                        onChange={handleToggle}
                        disabled={!alive}
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#8b7ff9',
                                '&:hover': {
                                    backgroundColor: 'rgba(139, 127, 249, 0.08)',
                                },
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#8b7ff9',
                            },
                        }}
                    />
                </Paper>
            </CardContent>
        </Card>
    );
};

export default FireAlarmDevice;
