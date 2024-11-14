import { Switch } from '@mui/material';
import './devicecontrols.css';
import FireAlarmDevice from '../FireAlarmDevice/FireAlarmDevice';
import { startTransition, useEffect, useState } from 'react';
import DoorControl from '../DoorControl/DoorControl';
import Light from '../Light/Light';
import io from 'socket.io-client';

function DeviceControls() {
    const socket = io('http://localhost:5000');

    // const listPumpControl = [
    //     { name: 'Pump Control 1', status: 'ON' },
    //     { name: 'Pump Control 2', status: 'ON' },
    // ];
    const [listPump, setListPump] = useState([]);
    const [listDoors, setListDoors] = useState([]);

    useEffect(() => {
        socket.on('pump', (data) => {
            const isAlive = data === 'True' ? true : false;
            console.log('Pump is alive:', isAlive);
            setListPump((prevListPump) =>
                prevListPump.map((pump) => ({ ...pump, alive: isAlive })),
            );
        });
        return () => {
            socket.off('pump');
        };
    }, []);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                // Fetch pump devices
                const pumpResponse = await fetch('http://localhost:5000/api/device?type=pump');
                if (pumpResponse.ok) {
                    const pumpData = await pumpResponse.json();
                    setListPump(pumpData.listDevice);
                }

                // Fetch door devices
                const doorResponse = await fetch('http://localhost:5000/api/device?type=door');
                if (doorResponse.ok) {
                    const doorData = await doorResponse.json();
                    setListDoors(doorData.listDevice);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchDevices();
    }, []);

    return (
        <div className="device-controls">
            {/* Điều khiển bóng đèn */}
            <div className="device-control">
                <div className="device-header">
                    <div className="title-section">
                        <h1>Smart Lighting</h1>
                        <p>Control your home lighting system</p>
                    </div>
                    <div className="status-badge">
                        <div className="status-dot"></div>
                        Connected
                    </div>
                </div>
                <div className="light-container">
                    <Light />
                </div>
            </div>

            {/* Điều khiển cửa */}
            <div
                className="device-control"
                style={{
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF2D55 100%)',
                }}
            >
                <div className="device-header">
                    <div className="title-section">
                        <h1>Smart Door</h1>
                        <p>Control your door security system</p>
                    </div>
                    <div className="status-badge">
                        <div className="status-dot"></div>
                        Connected
                    </div>
                </div>
                <div
                    className="door-container"
                    style={{
                        display: 'flex',
                        gap: '20px',
                        flexWrap: 'wrap',
                    }}
                >
                    {listDoors.map((door) => (
                        <DoorControl key={door._id} device={door} />
                    ))}
                </div>
            </div>

            {/* Điều khiển các thiết bị báo cháy */}
            <div
                className="device-control"
                style={{
                    background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
                }}
            >
                <div className="device-header">
                    <div className="title-section">
                        <h1>Fire Safety Devices</h1>
                        <p>Control your home lighting system</p>
                    </div>
                    <div className="status-badge">
                        <div className="status-dot"></div>
                        Connected
                    </div>
                </div>
                <div
                    className="fire-container"
                    style={{
                        display: 'flex',
                        gap: '20px',
                    }}
                >
                    {listPump.map((device) => (
                        <FireAlarmDevice key={device._id} device={device} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DeviceControls;
