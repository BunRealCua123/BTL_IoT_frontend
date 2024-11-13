import React, { useState } from 'react';
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
    Grid,
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
    // Hardcoded initial devices data
    const initialDevices = [
        {
            _id: '1',
            name: 'Living Room Light',
            type: 'light',
            location: 'Living Room',
            description: 'Main ceiling light in living room',
            alive: true,
        },
        {
            _id: '2',
            name: 'Front Door Lock',
            type: 'door',
            location: 'Entrance',
            description: 'Smart lock for front door',
            alive: true,
        },
        {
            _id: '3',
            name: 'Temperature Sensor',
            type: 'sensor',
            location: 'Kitchen',
            description: 'Temperature and humidity sensor',
            alive: false,
        },
        {
            _id: '4',
            name: 'Water Pump',
            type: 'pump',
            location: 'Garden',
            description: 'Automatic garden irrigation pump',
            alive: true,
        },
    ];

    const [devices, setDevices] = useState(initialDevices);
    const [open, setOpen] = useState(false);
    const [editDevice, setEditDevice] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        location: '',
        description: '',
    });

    const handleOpen = (device = null) => {
        if (device) {
            setEditDevice(device);
            setFormData({
                name: device.name,
                type: device.type,
                location: device.location,
                description: device.description,
            });
        } else {
            setEditDevice(null);
            setFormData({
                name: '',
                type: '',
                location: '',
                description: '',
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

    const handleSubmit = () => {
        if (editDevice) {
            // Update existing device
            setDevices(
                devices.map((device) =>
                    device._id === editDevice._id ? { ...device, ...formData } : device,
                ),
            );
        } else {
            // Add new device
            const newDevice = {
                _id: String(Date.now()), // Simple way to generate unique id
                ...formData,
                alive: true, // Default to connected state
            };
            setDevices([...devices, newDevice]);
        }
        handleClose();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this device?')) {
            setDevices(devices.filter((device) => device._id !== id));
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

            <Grid container spacing={3}>
                {devices.map((device) => (
                    <Grid item xs={12} sm={6} md={4} key={device._id}>
                        <Card
                            sx={{
                                height: '100%',
                                background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
                                borderRadius: '16px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            }}
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 2,
                                    }}
                                >
                                    <Typography variant="h6" component="h2">
                                        {device.name}
                                    </Typography>
                                    <Chip
                                        icon={device.alive ? <CheckIcon /> : <ErrorIcon />}
                                        label={device.alive ? 'Connected' : 'Offline'}
                                        color={device.alive ? 'success' : 'error'}
                                        size="small"
                                    />
                                </Box>
                                <Typography color="textSecondary" gutterBottom>
                                    Type: {device.type}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    Location: {device.location}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    {device.description}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpen(device)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(device._id)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editDevice ? 'Edit Device' : 'Add New Device'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            name="name"
                            label="Device Name"
                            fullWidth
                            value={formData.name}
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
                                <MenuItem value="light">Light</MenuItem>
                                <MenuItem value="door">Door</MenuItem>
                                <MenuItem value="pump">Pump</MenuItem>
                                <MenuItem value="sensor">Sensor</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            name="location"
                            label="Location"
                            fullWidth
                            value={formData.location}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="description"
                            label="Description"
                            fullWidth
                            multiline
                            rows={3}
                            value={formData.description}
                            onChange={handleInputChange}
                        />
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
                        {editDevice ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DeviceManagement;
