import PowerConsumptionChart from '../PowerConsumptionChart/PowerConsumptionChart';
import TestChart from '../PowerConsumptionChart/TestChart';
import RecognitionDisplay from '../RecognitionDisplay/RecognitionDisplay';
import FaceRecognitionStream from '../FaceRecognitionStream/FaceRecognitionStream';
function RightSidebar() {
    return (
        <div className="right-sidebar">
            <TestChart />
            {/* <RecognitionDisplay /> */}
            <FaceRecognitionStream />
        </div>
    );
}

export default RightSidebar;
