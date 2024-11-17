import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Chip,
    Paper,
    Grid2,
    CircularProgress,
} from '@mui/material';
import {
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Person as PersonIcon,
    DoorFront as DoorIcon,
    Security as SecurityIcon,
} from '@mui/icons-material';
import { io } from 'socket.io-client';
import { styled } from '@mui/material/styles';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 1000,
    margin: 'auto',
    marginTop: theme.spacing(0),
    position: 'relative',
}));

const StreamContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
}));

const StreamImage = styled('img')(({ theme }) => ({
    width: '100%',
    height: 'auto',
    display: 'block',
}));

const RecognitionOverlay = styled(Paper)(({ theme }) => ({
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    right: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    backdropFilter: 'blur(4px)',
}));

const StatusChipContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2),
}));

const FaceRecognitionStream = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [facesDetected, setFacesDetected] = useState(0);
    const [doorStatus, setDoorStatus] = useState('CLOSE');
    const [doorAlive, setDoorAlive] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const imageRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        // Connect to streaming server on port 8765
        socketRef.current = io('ws://localhost:8765');

        socketRef.current.on('connect', () => {
            setIsConnected(true);
        });

        socketRef.current.on('disconnect', () => {
            setIsConnected(false);
        });

        socketRef.current.on('frame', (data) => {
            if (imageRef.current) {
                imageRef.current.src = `data:image/jpeg;base64,${data.image}`;
            }
            setFacesDetected(data.faces_detected);
            setDoorStatus(data.door_status);
            setDoorAlive(data.door_alive);
            setRecognition(data.recognition);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    return (
        <StyledCard elevation={3}>
            <CardHeader
                title={
                    <Box display="flex" alignItems="center" gap={1}>
                        <SecurityIcon color="primary" />
                        <Typography variant="h6">Face Recognition System</Typography>
                    </Box>
                }
                action={
                    <Chip
                        icon={isConnected ? <CheckCircleIcon /> : <CancelIcon />}
                        label={isConnected ? 'Connected' : 'Disconnected'}
                        color={isConnected ? 'success' : 'error'}
                        variant="filled"
                    />
                }
            />

            <CardContent>
                <StatusChipContainer>
                    <Chip
                        icon={<DoorIcon />}
                        label={`Door: ${doorAlive ? 'Online' : 'Offline'}`}
                        color={doorAlive ? 'success' : 'error'}
                        variant="outlined"
                    />
                    <Chip
                        label={`Status: ${doorStatus}`}
                        color={doorStatus === 'LOGCLOSE' ? 'info' : 'warning'}
                        variant="outlined"
                    />
                    <Chip
                        icon={<PersonIcon />}
                        label={`Faces Detected: ${facesDetected}`}
                        color={facesDetected > 0 ? 'primary' : 'default'}
                        variant="outlined"
                    />
                </StatusChipContainer>

                <StreamContainer>
                    {!isConnected && (
                        <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            sx={{ transform: 'translate(-50%, -50%)' }}
                            zIndex={2}
                        >
                            <CircularProgress />
                        </Box>
                    )}

                    <StreamImage
                        ref={imageRef}
                        alt="Camera Stream"
                        sx={{ filter: !isConnected ? 'brightness(0.7)' : 'none' }}
                    />

                    {recognition && (
                        <RecognitionOverlay elevation={3}>
                            <Grid2 container spacing={2} alignItems="center">
                                <Grid2 item xs>
                                    <Typography variant="h6" component="div">
                                        {recognition.name}
                                    </Typography>
                                    {recognition.common_name && (
                                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                            {recognition.common_name}
                                        </Typography>
                                    )}
                                </Grid2>
                                <Grid2 item>
                                    <Chip
                                        label={`${(recognition.confidence * 100).toFixed(
                                            1,
                                        )}% confidence`}
                                        color="primary"
                                        size="small"
                                        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                                    />
                                </Grid2>
                            </Grid2>
                        </RecognitionOverlay>
                    )}
                </StreamContainer>
            </CardContent>
        </StyledCard>
    );
};

export default FaceRecognitionStream;
