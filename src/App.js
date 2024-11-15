import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import DeviceManagement from './components/DeviceManagement/DeviceManagement';
import UserList from './components/UserList/UserList';
import UserDetail from './components/UserDetail/UserDetail';

function App() {
    return (
        <BrowserRouter>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flexGrow: 1 }}>
                    <Routes>
                        <Route path="/" element={<MainContent />} />
                        <Route path="/devices" element={<DeviceManagement />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/users/:id" element={<UserDetail />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
