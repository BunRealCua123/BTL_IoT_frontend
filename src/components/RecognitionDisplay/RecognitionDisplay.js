import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import io from 'socket.io-client';

// Adjust URL to match your backend

const RecognitionDisplay = () => {
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        const fetchLatestRecognition = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/recognitions?limit=1');
                const data = await response.json();
                if (data.length > 0) {
                    setRecognition(data[0]);
                }
            } catch (error) {
                console.error('Error fetching recognition:', error);
            }
        };

        fetchLatestRecognition();
        const socket = io('http://localhost:5000');
        socket.on('door_recognition', (newRecognition) => {
            setRecognition(newRecognition);
        });

        return () => {
            socket.off('door_recognition');
        };
    }, []);

    if (!recognition) {
        return null;
    }

    return (
        <Card sx={{ mt: 2, maxWidth: 345, mx: 'auto' }}>
            <CardMedia
                component="img"
                height="240"
                image={'http://localhost:5000/' + recognition.image_url}
                alt="Face Recognition"
                sx={{ objectFit: 'cover' }}
            />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Latest Door Access: {recognition.user_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {new Date(recognition.timestamp).toLocaleString()}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default RecognitionDisplay;
