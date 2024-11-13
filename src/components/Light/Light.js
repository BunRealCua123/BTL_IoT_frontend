import React, { useState, useEffect } from 'react';
import {
    Button,
    Switch,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Typography,
    Box,
    Grid,
    Menu,
    MenuItem,
    Badge,
    Card,
    CardContent,
    Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { WaterDrop } from '@mui/icons-material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import io from 'socket.io-client';

// Socket setup
const socket = io('http://localhost:5000');

// Styled components
const Lightbulb = styled(LightbulbIcon)(({ theme, status }) => ({
    fontSize: '60px',
    color: status === 'ON' ? '#FF9800' : theme.palette.action.disabled,
    transition: 'color 0.3s',
}));

const DeviceCard = styled(motion.div)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderRadius: '10px',
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    background: 'linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
    },
}));

const BlinkingBadge = styled(Badge)(({ active }) => ({
    animation: active ? 'blink 1s infinite' : 'none',
    '@keyframes blink': {
        '0%': { opacity: 1 },
        '50%': { opacity: 0 },
        '100%': { opacity: 1 },
    },
}));

const App = () => {
    const [devices, setDevices] = useState([]);
    const [deviceName, setDeviceName] = useState('');
    const [deviceType, setDeviceType] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);

    useEffect(() => {
        loadDevicesByType('Led');

        socket.on('light', (data) => {
            const [name, state] = data.split(';');
            setDevices((prevDevices) =>
                prevDevices.map((device) =>
                    device.deviceId === name ? { ...device, status: state } : device,
                ),
            );
        });

        socket.on('log', (status) => {
            const isAlive = status === 'True'; // Xác định trạng thái alive từ 'True' hoặc 'False'
            setDevices((prevDevices) =>
                prevDevices.map((device) => ({ ...device, alive: isAlive })),
            );
        });

        return () => {
            socket.off('light');
            socket.off('log');
        };
    }, []);

    const loadDevicesByType = async (type) => {
        try {
            const response = await fetch(`http://localhost:5000/api/device?type=${type}`);
            const data = await response.json();
            setDevices(
                data.listDevice.map((device) => ({ ...device, isAuto: device.mode === 'auto' })),
            );
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const sendCommand = async (mes) => {
        try {
            await fetch('http://localhost:5000/api/light', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: mes }),
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const sendAutoCommand = async (mes) => {
        try {
            await fetch('http://localhost:5000/api/light/auto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: mes }),
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggleAutoMode = (device) => {
        setDevices((prevDevices) =>
            prevDevices.map((d) => (d._id === device._id ? { ...d, isAuto: !d.isAuto } : d)),
        );
        if (!device.isAuto) {
            sendAutoCommand(`${device.deviceId};auto`);
        } else {
            // Khi bật chế độ tự động
            sendAutoCommand(`${device.deviceId};manual`);
        }
    };

    const registerDevice = async (event) => {
        event.preventDefault();
        try {
            await fetch('http://localhost:5000/api/register/device', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ device: deviceName, type: deviceType }),
            });
            setDeviceName('');
            setDeviceType('');
            setDialogOpen(false);
            loadDevicesByType(deviceType);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteDevice = async (deviceId) => {
        try {
            await fetch('http://localhost:5000/api/delete/device', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: deviceId }),
            });
            loadDevicesByType('Led');
            handleCloseMenu();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleMenuOpen = (event, deviceId) => {
        setAnchorEl(event.currentTarget);
        setSelectedDeviceId(deviceId);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Grid>
                {devices.map((device) => (
                    <Grid item xs={12} sm={6} md={4} key={device._id}>
                        <Card
                            sx={{
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '20px',
                                width: '250px',
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
                                        color: '#4b4a49',
                                        paddingBottom: '15px',
                                        marginBottom: '20px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div>{device.deviceId}</div>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                        <Switch
                                            checked={device.isAuto}
                                            onChange={() => toggleAutoMode(device)}
                                            color="primary" // Thay đổi màu sắc cho switch
                                        />
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                ml: 1,
                                                fontWeight: 'bold',
                                                color: device.isAuto ? 'green' : 'black',
                                            }} // Tăng độ đậm và thay đổi màu sắc tùy theo trạng thái
                                        >
                                            {device.isAuto ? 'Auto' : 'Manual'}
                                        </Typography>
                                    </Box>
                                    <IconButton
                                        onClick={(event) => handleMenuOpen(event, device._id)}
                                    >
                                        <MoreHorizIcon />
                                    </IconButton>
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(100,255,255,0.5)',
                                        borderRadius: '15px',
                                        padding: '10px 20px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <Box
                                        sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                                    >
                                        {/* <Lightbulb /> */}
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Lightbulb
                                                sx={{
                                                    fontSize: '40px',
                                                    color:
                                                        device.status === 'ON'
                                                            ? '#FF9800'
                                                            : '#757575',
                                                }}
                                            />
                                            <BlinkingBadge
                                                color={device.alive ? 'success' : 'error'}
                                                variant="dot"
                                                overlap="circular"
                                                active={true}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                    transform: 'translate(50%, -50%)',
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <Switch
                                        checked={device.status === 'ON'}
                                        onChange={() =>
                                            sendCommand(
                                                `${device.deviceId};${
                                                    device.status === 'ON' ? 'OFF' : 'ON'
                                                }`,
                                            )
                                        }
                                        disabled={device.isAuto}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <br />
            <Box sx={{ position: 'relative', mt: 4 }}>
                <IconButton
                    color="primary"
                    onClick={() => setDialogOpen(true)}
                    sx={{ position: 'absolute', bottom: 0, right: 0 }}
                >
                    <AddIcon />
                </IconButton>
            </Box>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Đăng ký Thiết Bị Mới</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên thiết bị"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={deviceName}
                        onChange={(e) => setDeviceName(e.target.value)}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Loại thiết bị"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={deviceType}
                        onChange={(e) => setDeviceType(e.target.value)}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Hủy</Button>
                    <Button onClick={registerDevice}>Đăng ký</Button>
                </DialogActions>
            </Dialog>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <MenuItem onClick={() => handleDeleteDevice(selectedDeviceId)}>
                    Xóa Thiết Bị
                </MenuItem>
            </Menu>
        </div>
    );
};

export default App;
