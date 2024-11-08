// App.js
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Switch, Container, Paper } from '@mui/material';
import { LightbulbCircle, WaterDrop } from '@mui/icons-material';

const FireAlarmDevice = ({ device }) => {
    const [isOn, setIsOn] = useState(true);
    const { name, status } = device;

    const handleToggle = (event) => {
        setIsOn(event.target.checked);
    };

    return (
        <Card
            sx={{
                background: '#d2e9dc',
                borderRadius: '20px',
                width: '300px',
                height: '250px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#4b4a49',
                        paddingBottom: '15px',
                        borderBottom: '1px solid #eee',
                        marginBottom: '20px',
                    }}
                >
                    {name}
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
