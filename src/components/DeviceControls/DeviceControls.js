import { Switch } from '@mui/material';
import './devicecontrols.css';
import FireAlarmDevice from '../FireAlarmDevice/FireAlarmDevice';
import { startTransition } from 'react';
import DoorControl from '../DoorControl/DoorControl';
import Light from '../Light/Light';
function DeviceControls() {
    const listPumpControl = [
        { name: 'Pump Control 1', status: 'ON' },
        { name: 'Pump Control 2', status: 'ON' },
    ];
    return (
        <div className="device-controls">
            {/* Điều khiển bóng đèn */}
            <div className="device-control">
                <div class="device-header">
                    <div class="title-section">
                        <h1>Smart Lighting</h1>
                        <p>Control your home lighting system</p>
                    </div>
                    <div class="status-badge">
                        <div class="status-dot"></div>
                        Connected
                    </div>
                </div>
                <div className="light-container">
                    {/* Thêm điều khiển đèn vào đây .......................*/}
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
                <div class="device-header">
                    <div class="title-section">
                        <h1>Smart Door</h1>
                        <p>Control your home lighting system</p>
                    </div>
                    <div class="status-badge">
                        <div class="status-dot"></div>
                        Connected
                    </div>
                </div>
                <div className="door-container">
                    <DoorControl doorName="main_door" />
                </div>
            </div>

            {/* Điều khiển các thiết bị báo cháy */}
            <div
                className="device-control"
                style={{
                    background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
                }}
            >
                <div class="device-header">
                    <div class="title-section">
                        <h1>Fire Safety Devices</h1>
                        <p>Control your home lighting system</p>
                    </div>
                    <div class="status-badge">
                        <div class="status-dot"></div>
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
                    {/* Thêm điều khiển thiết bị an toàn vào đây .......................*/}
                    {listPumpControl.map((device) => (
                        <FireAlarmDevice device={device} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DeviceControls;
