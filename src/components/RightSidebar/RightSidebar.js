import PowerConsumptionChart from '../PowerConsumptionChart/PowerConsumptionChart';
import TestChart from '../PowerConsumptionChart/TestChart';
import RecognitionDisplay from '../RecognitionDisplay/RecognitionDisplay';
function RightSidebar() {
    return (
        <div className="right-sidebar">
            <TestChart />
            <RecognitionDisplay />
        </div>
    );
}

export default RightSidebar;
