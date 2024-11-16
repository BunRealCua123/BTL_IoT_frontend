import DeviceControls from '../DeviceControls/DeviceControls';
import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import WelcomeCard from '../WelcomeCard/WelcomeCard';
import FireAlert from '../FireAlert/FireAlert';
import './maincontent.css';
import io from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

function MainContent() {
    const [isFire, setIsFire] = useState(false);
    const [showAlert, setShowAlert] = useState(true);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const socket = io('http://localhost:5000');
        const close1 = false;
        socket.on('firealarm', (data) => {
            const [device, status, pump_status] = data.split(';');
            if (status === 'YES' && showAlert === true) {
                setIsFire(true);
            }
        });

        return () => {
            socket.off('firealarm');
        };
    }, [showAlert]);

    const handleClose = () => {
        setIsFire(false);
        setShowAlert(false);
        timeoutRef.current = setTimeout(() => {
            setShowAlert(true);
        }, 10000);
    };

    const username = localStorage.getItem('name');
    return (
        <div className="main-content">
            <Header />
            <WelcomeCard username={username} />
            <FireAlert show={isFire} onClose={handleClose} />
            <div className="content-grid">
                <DeviceControls />
                <RightSidebar />
            </div>
        </div>
    );
}

export default MainContent;
