import {
    Devices,
    Home,
    LocationCity,
    Logout,
    People,
    Shield,
} from '@mui/icons-material';
import './sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <div className="menu-item">
                    <Home className="sidebar-icon" />
                    <span className="menu-text">Home</span>
                </div>
                <div className="menu-item">
                    <Devices className="sidebar-icon" />
                    <span className="menu-text">Devices</span>
                </div>
                <div className="menu-item">
                    <Shield className="sidebar-icon" />
                    <span className="menu-text">Security</span>
                </div>
                <div className="menu-item">
                    <People className="sidebar-icon" />
                    <span className="menu-text">People</span>
                </div>
            </div>
            <div className="sidebar-bottom">
                <div className="menu-item">
                    <Logout className="sidebar-icon" />
                    <span className="menu-text">Logout</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
