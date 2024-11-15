import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    IconButton,
    Paper,
    Grid2,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const UserDetail = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);

    // Demo data - replace with API call later
    const demoUser = {
        name: 'John Doe',
        username: 'johndoe',
        password: '123456',
    };

    const handleImageUpload = (event, imageNumber) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (imageNumber === 1) {
                    setImage1(reader.result);
                } else {
                    setImage2(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Add API call to save changes
        console.log('Saving changes...');
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, width: '700px' }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
                    User Details
                </Typography>

                <Grid2 container spacing={4}>
                    <Grid2 item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            defaultValue={demoUser.name}
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            fullWidth
                            label="Username"
                            defaultValue={demoUser.username}
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            defaultValue={demoUser.password}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                            sx={{ mb: 3 }}
                        />
                    </Grid2>

                    <Grid2
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Face Recognition Images
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                mb: 3,
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                padding: '0 80px',
                            }}
                        >
                            <Box
                                sx={{
                                    width: 200,
                                    height: 200,
                                    border: '2px dashed #ccc',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {image1 ? (
                                    <img
                                        src={image1}
                                        alt="Face 1"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                ) : (
                                    <AddPhotoAlternateIcon sx={{ fontSize: 40, color: '#ccc' }} />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        opacity: 0,
                                        cursor: 'pointer',
                                    }}
                                    onChange={(e) => handleImageUpload(e, 1)}
                                />
                            </Box>

                            <Box
                                sx={{
                                    width: 200,
                                    height: 200,
                                    border: '2px dashed #ccc',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {image2 ? (
                                    <img
                                        src={image2}
                                        alt="Face 2"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                ) : (
                                    <AddPhotoAlternateIcon sx={{ fontSize: 40, color: '#ccc' }} />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        opacity: 0,
                                        cursor: 'pointer',
                                    }}
                                    onChange={(e) => handleImageUpload(e, 2)}
                                />
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" size="large" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default UserDetail;
