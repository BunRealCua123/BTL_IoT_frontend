import { Doorbell, Settings } from '@mui/icons-material';
import './header.css';

function Header() {
    return (
        <div className="header">
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="header-right">
                <Settings />
                <Doorbell />
                <div className="profile">
                    <div className="profile-img"></div>
                    <span>Scarlett</span>
                </div>
            </div>
        </div>
    );
}

export default Header;
