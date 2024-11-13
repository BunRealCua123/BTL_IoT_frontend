import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid2,
    Chip,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Check as CheckIcon,
    Error as ErrorIcon,
} from '@mui/icons-material';

const DeviceManagement = () => {
    const [devices, setDevices] = useState([]);
    const [open, setOpen] = useState(false);
    const [editDevice, setEditDevice] = useState(null);
    const [formData, setFormData] = useState({
        device: '',
        type: '',
    });

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async (deviceType = '') => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/device${deviceType ? `?type=${deviceType}` : ''}`,
            );
            const data = await response.json();
            setDevices(data.listDevice || []);
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    const handleOpen = (device = null) => {
        if (device) {
            setEditDevice(device);
            setFormData({
                device: device.deviceId,
                type: device.type,
            });
        } else {
            setEditDevice(null);
            setFormData({
                device: '',
                type: '',
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditDevice(null);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/register/device', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchDevices();
                handleClose();
            } else {
                const error = await response.json();
                alert(error.error || 'Failed to add device');
            }
        } catch (error) {
            console.error('Error adding device:', error);
            alert('Failed to add device');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this device?')) {
            try {
                const response = await fetch('http://localhost:5000/api/delete/device', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ device_id: id }),
                });

                if (response.ok) {
                    fetchDevices();
                } else {
                    const error = await response.json();
                    alert(error.error || 'Failed to delete device');
                }
            } catch (error) {
                console.error('Error deleting device:', error);
                alert('Failed to delete device');
            }
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Device Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{
                        background: 'linear-gradient(135deg, #6B8EFF 0%, #4318FF 100%)',
                    }}
                >
                    Add Device
                </Button>
            </Box>

            <Grid2 container spacing={3}>
                {devices.map((device) => (
                    <Grid2
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        width={300}
                        height={200}
                        key={device.deviceId}
                    >
                        <Card
                            sx={{
                                width: '100%',
                                height: '100%', // Fixed height
                                background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
                                borderRadius: '16px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardContent
                                sx={{
                                    flex: 1,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    padding: '20px !important', // Override default padding
                                }}
                            >
                                <Box>
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
                                            component="h2"
                                            sx={{
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {device.deviceId}
                                        </Typography>
                                        <Chip
                                            icon={device.alive ? <CheckIcon /> : <ErrorIcon />}
                                            label={device.alive ? 'Connected' : 'Disconnected'}
                                            color={device.alive ? 'success' : 'error'}
                                            size="small"
                                        />
                                    </Box>
                                    <Typography
                                        color="textSecondary"
                                        sx={{
                                            mb: 1,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        Type: {device.type}
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        sx={{
                                            mb: 1,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        Mode: {device.mode}
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        sx={{
                                            mb: 1,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        Topic: {device.topic}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: 1,
                                        marginTop: 'auto',
                                    }}
                                >
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(device.deviceId)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Device</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            name="device"
                            label="Device ID"
                            fullWidth
                            value={formData.device}
                            onChange={handleInputChange}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Device Type</InputLabel>
                            <Select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                label="Device Type"
                            >
                                <MenuItem value="Led">Led</MenuItem>
                                <MenuItem value="door">Door</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(135deg, #6B8EFF 0%, #4318FF 100%)',
                        }}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DeviceManagement;
