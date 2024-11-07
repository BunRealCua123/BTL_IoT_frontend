import DeviceControls from '../DeviceControls/DeviceControls';
import Header from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import WelcomeCard from '../WelcomeCard/WelcomeCard';
import './maincontent.css';

function MainContent() {
    return (
        <div className="main-content">
            <Header />
            <WelcomeCard />
            <div className="content-grid">
                <DeviceControls />
                <RightSidebar />
            </div>
        </div>
    );
}

export default MainContent;
