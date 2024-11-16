import { use } from 'framer-motion/client';
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
    useEffect(() => {
        const socket = io('http://localhost:5000');

        socket.on('firealarm', (data) => {
            const [device, status, pump_status] = data.split(';');
            if (status === 'YES') {
                // alert(`Fire alarm detected in ${device}`);
                setIsFire(true);
            }
        });
        return () => {
            socket.off('firealarm');
        };
    }, []);

    // useEffect(() => {
    //     let timer;
    //     if (close) {
    //         timer = setTimeout(() => {
    //             setClose(false);
    //         }, 10000); // 60000ms = 1 phút
    //     }
    //     return () => {
    //         if (timer) {
    //             clearTimeout(timer);
    //         }
    //     };
    // }, [close]);

    const handleClose = () => {
        setIsFire(false);
        setClose(true);
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
