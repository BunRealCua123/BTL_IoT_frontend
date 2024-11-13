import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import DeviceControls from './components/DeviceControls/DeviceControls';
import DeviceManagement from './components/DeviceManagement/DeviceManagement';

function App() {
    return (
        <BrowserRouter>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flexGrow: 1 }}>
                    <Routes>
                        <Route path="/" element={<MainContent />} />
                        <Route path="/devices" element={<DeviceManagement />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
