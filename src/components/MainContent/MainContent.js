import DeviceControls from '../DeviceControls/DeviceControls';
import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import WelcomeCard from '../WelcomeCard/WelcomeCard';
import FireAlert from '../FireAlert/FireAlert';
import './maincontent.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

function MainContent() {
    const [isFire, setIsFire] = useState(false);
    const [close, setClose] = useState(false);
    const [fireTimeout, setFireTimeout] = useState(null); // State để quản lý thời gian chờ

    useEffect(() => {
        const socket = io('http://localhost:5000');

        socket.on('firealarm', (data) => {
            const [device, status, pump_status] = data.split(';');
            if (status === 'YES') {
                if (!close) {
                    setIsFire(true);
                } else {
                    const timeout = setTimeout(() => {
                        setClose(false);
                    }, 20000);
                    // setFireTimeout(timeout);
                }
            }
        });

        return () => {
            socket.off('firealarm');
        };
    }, [close, fireTimeout]);

    const handleClose = () => {
        setIsFire(false);
        setClose(true);
        // if (fireTimeout) {
        //     clearTimeout(fireTimeout);
        // }
        // const timeout = setTimeout(() => {
        //     setIsFire(true);
        //     setClose(false);
        // }, 60000); // 1 phút
        // setFireTimeout(timeout);
    };

    console.log('close', close);
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
