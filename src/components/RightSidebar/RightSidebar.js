import PowerConsumptionChart from '../PowerConsumptionChart/PowerConsumptionChart';
import RecognitionDisplay from '../RecognitionDisplay/RecognitionDisplay';
function RightSidebar() {
    return (
        <div className="right-sidebar">
            <PowerConsumptionChart />
            <RecognitionDisplay />
        </div>
    );
}

export default RightSidebar;
