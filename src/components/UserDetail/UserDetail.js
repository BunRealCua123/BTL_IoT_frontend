import React, { useEffect, useState } from 'react';
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
import { useLocation } from 'react-router-dom';

const UserDetail = () => {
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const id = location.pathname.split('/').pop();
    console.log(location.pathname.split('/').pop());
    // Demo data - replace with API call later
    // const demoUser = {
    //     name: 'John Doe',
    //     username: 'johndoe',
    //     password: '123456',
    // };
    const [user, setUser] = useState({
        name: '',
        username: '',
        password: '',
        image1: '',
        image2: '',
        idImage1: '',
        idImage2: '',
    });

    const getUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/detailuser?_id=${id}`);
        const data = await response.json();
        console.log('data', data.user);
        setUser({ ...user, ...data.user });
    };
    useEffect(() => {
        getUser();
    }, []);
    // console.log('user', user);

    const handleImageUpload = (event, imageNumber) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (imageNumber === 1) {
                    setUser({ ...user, image1: reader.result });
                } else {
                    setUser({ ...user, image2: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const fetchImage = async (name, common_name, image) => {
        const response = await fetch(`${process.env.REACT_APP_AI_URL}/faces/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image_base64: image,
                name: name,
                common_name: common_name,
            }),
        });
        const data = await response.json();
        console.log('data', data);
        if (response.ok) {
            return data.face_id;
        }
        return false;
    };

    const fetchDeleteImage = async (idImage) => {
        if (idImage) {
            const response = await fetch(`${process.env.REACT_APP_AI_URL}/faces/${idImage}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log('data', data);
            return response.ok;
        }
        return true;
    };

    const handleSave = async () => {
        // Đoạn này để add face vào database
        // const reponse2 = await fetch('http://localhost:8000/faces/add', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         image_base64: user.image1,
        //         name: user.name,
        //         common_name: user.username,
        //     }),
        // });
        // const data2 = await reponse2.json();
        // console.log('data2', data2);
        if (fetchDeleteImage(user.idImage1) && fetchDeleteImage(user.idImage2)) {
            const idImage1 = await fetchImage(user.name + '1', user.username, user.image1);
            const idImage2 = await fetchImage(user.name + '2', user.username, user.image2);
            //add thành công mới update trên mongodb
            if (idImage1 && idImage2) {
                const reponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/updateimage`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        _id: location.pathname.split('/').pop(),
                        image1: user.image1,
                        image2: user.image2,
                        idImage1: idImage1,
                        idImage2: idImage2,
                    }),
                });
                const data = await reponse.json();
                console.log('data', data);
                if (reponse.ok) {
                    alert('Update successfully');
                    getUser();
                }
            } else if (!idImage1) {
                alert('Upload image 1 failed');
                fetchDeleteImage(idImage2);
            } else if (!idImage2) {
                alert('Upload image 2 failed');
                fetchDeleteImage(idImage1);
            }
        } else {
            alert('Delete image failed');
        }

        // Add API call to save changes
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
                            value={user.name}
                            sx={{ mb: 3 }}
                            disabled
                        />

                        <TextField
                            fullWidth
                            label="Username"
                            value={user.username}
                            sx={{ mb: 3 }}
                            disabled
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={user.password}
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
                            disabled
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
                                {user.image1 ? (
                                    <img
                                        src={user.image1}
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
                                {user.image2 ? (
                                    <img
                                        src={user.image2}
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
