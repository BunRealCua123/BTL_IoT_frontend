import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter, Routes, Route, useLocation,Navigate  } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import DeviceManagement from './components/DeviceManagement/DeviceManagement';
import Login from './components/Login/login';
import { useState } from 'react';

function App() {

    const location = useLocation(); // Đảm bảo dùng useLocation trong BrowserRouter
    const isLoginPage = location.pathname === '/login'; // Kiểm tra trang login
    const username = localStorage.getItem('name');

    return (
        <div style={{ display: 'flex' }}>
            {/* Chỉ hiển thị Sidebar khi không phải trang login */}
            {!isLoginPage && <Sidebar />}
            <div style={{ flexGrow: 1 }}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<MainContent />} />
                    <Route path="/devices" element={<DeviceManagement />} />
                    
                </Routes>
            </div>
        </div>
    );
}

function AppWrapper() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default AppWrapper;
