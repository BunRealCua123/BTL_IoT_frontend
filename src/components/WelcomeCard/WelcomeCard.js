import '../WelcomeCard/welcomecard.css';

function WelcomeCard({ username }) {
    return (
        <div className="welcome-card">
            <div className="welcome-text">
                <h1>Hello, {username}!</h1>  {/* Hiển thị username thay vì 'Scarlett' */}
                <p>
                    Welcome Home! The air quality is good & fresh, you can go out
                    today.
                </p>
                <div className="weather-info">
                    <p>🌡️ +25°C Outdoor temperature</p>
                    <p>☁️ Fuzzy cloudy weather</p>
                </div>
            </div>
            <img
                src="https://emojigraph.org/media/mozilla/sun-behind-cloud_26c5.png"
                alt="Walking with dog"
                className="welcome-illustration"
            />
        </div>
    );
}

export default WelcomeCard;
