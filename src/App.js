import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter, Routes, Route, useLocation,Navigate  } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import DeviceManagement from './components/DeviceManagement/DeviceManagement';
import Login from './components/Login/login';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import RoleBasedRoute from './components/PrivateRoute/RoleBaseRoute';
import HideRoute from './components/PrivateRoute/HideRoute';
import UserList from './components/UserList/UserList';
import UserDetail from './components/UserDetail/UserDetail';
import Logout from './components/Logout/logout';

function App() {
    const [login, setLogin] = useState(false);
    const [role, setRole] = useState(null);

    const loginUser = (userRole) => {
        setLogin(true);
        setRole(userRole);
    } 

    const logoutUser = () => {
        setLogin(false);
        setRole(null);
    }
    return (
        <BrowserRouter>
        <>      
            <PrivateRoute isAuthenticated={login}>
                <div style={{ display: 'flex' }}>
                    <Sidebar requiredRole={role} />
                    <div style={{ flexGrow: 1 }}>
                        <Routes>
                            <Route path="/" element={<MainContent />} />
                        </Routes>
                        <RoleBasedRoute requiredRole={role}>
                            <Routes>
                                <Route path="/devices" element={<DeviceManagement />} />
                                <Route path="/users" element={<UserList />} />
                                <Route path="/users/:id" element={<UserDetail />} />
                                {/* Add more routes as needed */}
                            </Routes>
                        </RoleBasedRoute>
                    </div>
                </div>
            </PrivateRoute>
            <Routes>
                <Route path="/login" element={<Login onLoginSuccess={loginUser} />} />
                <Route path="/logout" element={<Logout onLogoutSuccess={logoutUser} />}/>
            </Routes>
        </>
        </BrowserRouter>
    );
}

export default App;
